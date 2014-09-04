App.SubredditRoute = Ember.Route.extend({
    actions : {
        fetchMore: function(model) {
            App.set('isLoading',true);
            var url ='';
            
            if (model.kind.sub == 'frontpage') {
                url = "http://www.reddit.com/.json?limit=25&after=" + model.data.after + "&jsonp="
            } else {
                url = "http://www.reddit.com/r/" + model.kind.sub + "/.json?limit=25&after=" + model.data.after + "&jsonp="
            }
            $.getJSON(url, function(response){
                $.each(response.data.children, function(key, value) {
                    model.data.children.pushObject(value);
                });
                
                model.data.after = response.data.after
                App.set('currentSub', model.kind.sub);
                App.set('isLoading',false);
            });
        }
    },
    model: function(params) {
        document.title = "Ember | " + params.subreddit_id;
        var url ='';
        if (params.subreddit_id == 'frontpage') {
            url = "http://www.reddit.com/.json?limit=" + params.count + "&after=" + params.after + "&jsonp="
        } else {
            url = "http://www.reddit.com/r/" + params.subreddit_id + "/.json?limit=" + params.count + "&after=" + params.after + "&jsonp="
        }
        
        App.set('sub', params.subreddit_id);
        
        var model = $.getJSON(url, function(response){
            response.kind = {
                sub: params.subreddit_id,
                count: params.count,
                next: response.data.after
            };

            return response.data;
        });
        
        return model;
    }
});