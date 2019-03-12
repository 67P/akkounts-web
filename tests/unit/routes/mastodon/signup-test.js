import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | mastodon/signup', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:mastodon/signup');
    assert.ok(route);
  });
});
