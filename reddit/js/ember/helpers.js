Ember.Handlebars.helper('breaklines', function(text) {
    text = Handlebars.Utils.escapeExpression(text);
    text = text.replace(/(\r\n|\n|\r)/gm, '<br>');
    text = $('<textarea />').html(text).val();
    return new Handlebars.SafeString(text);
});

Ember.Handlebars.helper('link-image', function(src) {
    if (!src || src == "default" || src == "self") {
        return new Handlebars.SafeString('<div class="img-placeholder"><i class="fa fa-reddit"></i></div>');
    } else {
        return new Handlebars.SafeString('<img src="'+src+'" />');
    };
});