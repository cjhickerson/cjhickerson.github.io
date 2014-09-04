var subreddits = "frontpage";
var auth;
var user;

// Function to load remote templates so they aren't in a single master file. This is for our sanity in development. In production I expect it would be best to merge all the .js and .hbs into a single file.
var loadTempate = function(name, location) {
    $.ajax({ 
        url: location,
        async: false,
        dataType: 'html',
        success: function(data) {
            Ember.TEMPLATES[name] = Ember.Handlebars.compile(data) 
        }
    });
};

var App = Ember.Application.create({
    LOG_TRANSITIONS: true,
    //LOG_TRANSITIONS_INTERNAL: true
});

// Load external templates (this must be done before routing or things break
loadTempate('header', 'js/ember/templates/header.hbs');
loadTempate('subreddit', 'js/ember/templates/subreddit.hbs');
loadTempate('link', 'js/ember/templates/link.hbs');
loadTempate('comment', 'js/ember//templates/comment.hbs');
loadTempate('reply', 'js/ember/templates/reply.hbs');

App.Router.map(function() {
    this.resource("subreddit", { path: "/paginated/:subreddit_id/:after/:count" });
    this.resource("comment", { path: "/comment/:post_id" });
});

Ember.Application.initializer({
    name: 'user',
    initialize: function(container, application) {
        if ($.cookie('user')) {
            App.user = $.cookie('user');
        }
        App.auth = '';
        App.cmsContent = 'Click me to <b>Fetch</b> from the CMS';
        App.sub = 'frontpage';
    }
});

