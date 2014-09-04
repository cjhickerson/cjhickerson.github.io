App.CommentRoute = Ember.Route.extend({
    model: function(params) {
        var model = $.getJSON("http://www.reddit.com/comments/" + params.post_id + "/.json?jsonp=?", function(response){ 
            response.kind = params.post_id;
            window.scroll(0,0);
            document.title = "Ember | " + response[0]['data']['children'][0]['data']['title'];
            return response;
        });
        return model;
    }
});