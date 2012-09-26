var __mtt;
(function(window) {

    var _clientData = window.__mtdata;

    var isProcessable = function(data) {
        return data && data.client && data.action;
    };

    if (isProcessable(_clientData)) {

        if (!__mtt) {
            __mtt = (function(window) {

                // configuration
                var
                    _version = "1.0",

                    /* helpers */
                    _doc = window.document,
                    _navigatorAlias = window.navigator,
                    _escapeWrapper = window.encodeURIComponent || escape,

                    /* names */
                    _HIT_HOST = "http://hit.popego.boo-box.com/";

                // helpers
                function getTimestampParam() {
                    return "rid=" + (new Date().getTime()).toString();
                }


                /**
                 * Builds the pixers's callback url.
                 * @metod _getPixerUrl
                 */                
                function _getPixerUrl(client, action, params) {
                    if (typeof params === "string" && typeof client === "string" && typeof action === "string") {
                        return _HIT_HOST + client + "/0/" + action + params + "&" + getTimestampParam();
                    } else {
                        return -1;
                    }
                }

                /**
                * Sends a request to the passed url
                * @metod _sendRequest
                **/
                function _sendRequest(url) {
                    if (typeof url === "string") {
                        var im = new Image(1,1);
                        im.onload = function(){};
                        im.src = url;
                    }
                }

                // data accessor functions
                var
                    _isIfr, _ref, _lang, _clang, _meta_keywords, _user_id, _forced_segments
                    _meta_tags = _doc.getElementsByTagName("meta"),
                    _meta_tags_len = _meta_tags.length;

                function _getParams() {
                    var params = "?v=" + _escapeWrapper(_version) + "&ifr=" + (_isIfr ? "1" : "0");
                    if (_ref) {
                        params += "&ref=" + _escapeWrapper(_ref);
                    }
                    if (_lang) {
                        params += "&lang=" + _escapeWrapper(_lang);
                    }
                    if (_clang) {
                        params += "&clang=" + _escapeWrapper(_clang);
                    }
                    if (_meta_keywords) {
                        params += "&k=" + _escapeWrapper(_meta_keywords);
                    }
                    if (_forced_segments) {
                        params += "&seg=" + _forced_segments;
                    }
                    return params;
                }

                function _getBrowserLanguage() {
                    return (_navigatorAlias && _navigatorAlias.language ? _navigatorAlias.language : _navigatorAlias && _navigatorAlias.browserLanguage ? _navigatorAlias.browserLanguage  : "-").toLowerCase();
                }

                function _getContentLanguage() {
                    var _html = function() {
                        var el = _doc.getElementsByTagName("html")[0], r = "";
                        if (el && el.lang) {
                            r = el.lang;
                        }

                        return r;
                    },
                    _meta = function() {
                        var el, equiv, r = "";
                        var i;

                        for (i=0; i<_meta_tags_len; i++) {
                            el = _meta_tags[i];
                            equiv = el.httpEquiv;
                            if (equiv && equiv.toLowerCase() === "content-language") {
                                r = el.content || "";
                                break;
                            }
                        }
                        return r;
                    };

                    return _meta() || _html();
                }

                function _getMetaKeywords() {
                    var el, ret={}, i;
                    for (i=0; i<_meta_tags_len; i++) {
                        el = _meta_tags[i];
                        if (el.name && el.name.toLowerCase() == "keywords") {
                            return el.content || "";
                        }
                    }
                    return "";
                }

                function _isIframe() {
                    return self != top;
                }

                function _getRef() {
                    return _isIfr ? _doc.referrer || "0" : "0";
                }

                function _getForcedSegments() {
                    return _clientData.segments;
                }

                _isIfr = _isIframe();
                _ref = _getRef();
                _lang = _getBrowserLanguage();
                _clang = _getContentLanguage();
                _meta_keywords = _getMetaKeywords();
                _forced_segments = _getForcedSegments();

                return {
                    track: function(client, action) {
                        var url, params;

                        params = _getParams();
                        url = _getPixerUrl(client, action, params);
                        this.sendRequest(url);
                    },

                    sendRequest: _sendRequest

                };

            })(window);
        }

        try {
            var action = _clientData.action,
                client = _clientData.client;

            __mtt.track(client, action);
        } catch(err) {}
    }

})(window);
