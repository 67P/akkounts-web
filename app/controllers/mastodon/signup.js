import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { isEmpty, isPresent } from '@ember/utils';

export default Controller.extend({

  emailAddress: '',
  amount: 24,
  currency: 'USD',
  invoiceId: null,
  invoiceStatus: null,

  init () {
    this._super(...arguments)

    window.btcpay.onModalWillLeave(() => {
      fetch(`http://localhost:3200/accounts/mastodon/invoices/${this.invoiceId}`, {
        headers:{ 'Content-Type': 'application/json' }
      }).then(res => res.json())
        .then(invoice => {
          this.set('invoiceStatus', invoice.status);
        });
    })
  },

  invoiceNotCreated: computed('invoiceId', function () {
    return isEmpty(this.invoiceId);
  }),

  invoiceUnpaid: computed('invoiceId', 'invoiceStatus', function () {
    return isPresent(this.invoiceId) &&
           this.invoiceStatus !== 'complete';
  }),

  invoicePaid: computed('invoiceId', 'invoiceStatus', function () {
    return isPresent(this.invoiceId) &&
           this.invoiceStatus === 'complete';
  }),

  actions: {

    createInvoice () {
      const amount = parseFloat(this.amount);
      // TODO validate input

      if (isPresent(this.invoiceId)) {
        return window.btcpay.showInvoice(this.invoiceId);
      }

      fetch('http://localhost:3200/accounts/mastodon/invoices', {
        method: 'POST',
        body: JSON.stringify({
          email: this.emailAddress,
          price: amount,
          currency: this.currency
        }),
        headers:{
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(res => {
          this.set('invoiceId', res.invoice.id);
          window.btcpay.showInvoice(this.invoiceId);
        })
    }

  }

});
