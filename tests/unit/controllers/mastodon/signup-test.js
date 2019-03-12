import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | mastodon/signup', function(hooks) {
  setupTest(hooks);
  window.btcpay = { onModalWillLeave (/* cb */) {} }

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let controller = this.owner.lookup('controller:mastodon/signup');
    assert.ok(controller);
  });
});
