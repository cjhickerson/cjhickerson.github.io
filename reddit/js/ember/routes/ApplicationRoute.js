App.ApplicationRoute = Em.Route.extend({
    actions: {
        goToSub: function(sub) {
            subreddits = sub;
            $.cookie('subreddit', sub);
            this.transitionTo('/paginated/'+sub+"/0/25");
        }
    },
    model: function() {
        return {
            isLoading: false,
            currentSub: 'frontpage'
        };
    }
});