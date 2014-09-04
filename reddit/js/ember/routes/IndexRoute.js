App.IndexRoute = Ember.Route.extend({
    redirect: function() {
        if ($.cookie('subreddit')) {
            this.transitionTo('/paginated/' + $.cookie('subreddit') + "/0/25");
        } else {
            this.transitionTo('/paginated/frontpage/0/25');
        }
    }
});