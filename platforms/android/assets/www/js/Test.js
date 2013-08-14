ko.bindingHandlers.slider = {
    init: function (element, valueAccessor) {
        var val = valueAccessor()();
        $(element).slider(
                            {
                                value: val,
                                step: 3,
                                slide: function (event, ui) {
                                    alert("AAA");
                                    valueAccessor()(ui.value);
                                }
                            });
    },
    update: function (element, valueAccessor) {
        alert("APA");
        $(element).slider("option", "value", valueAccessor()());
    }
}