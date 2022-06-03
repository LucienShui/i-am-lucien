let globalCache = {};
let config = null;

function currentContentKey() {
    return location.hash === '' ? '/' : location.hash.substring(1);
}

function setHeaderAndFooter() {
    let footerDOM = document.getElementById('container-footer');
    if (footerDOM.innerHTML === '') {
        footerDOM.innerHTML = globalCache['footer'];
        document.getElementById('container-header').innerHTML = globalCache['header'];
    }
}

function get(url) {
    return new Promise((resolve, reject) => {
        axios.get(url).then(response => {
            resolve(response.data);
        })
    });
}

function post(url, params = {}, headers = {'Accept': 'application/json'}) {
    return new Promise((resolve, reject) => {
        axios.post(url, params, headers).then(response => {
            resolve(response.data);
        })
    });
}

function updateContent() {
    let hashKey = currentContentKey();
    if (!(hashKey in config['header'])) {
        location.hash = '#/';
        return null;
    }

    if (hashKey in globalCache) {
        document.getElementById('container-content').innerHTML = globalCache[hashKey];
        setHeaderAndFooter();
    } else {
        let url = config['header'][hashKey];
        axios.get(url).then(
            response => {
                // let hashKey = currentContentKey();
                innerHTML = response.data;
                globalCache[hashKey] = innerHTML;

                let containerContent = document.getElementById('container-content');
                containerContent.innerHTML = globalCache[hashKey];
                setHeaderAndFooter();

                let scriptList = Array.prototype.slice.call(containerContent.getElementsByTagName('script'));
                scriptList.forEach(function (script) { eval(script.innerHTML); });
            }
        )
    }
}

(function () {
    if (location.hash === '') {
        location.hash = '#/'
    }

    axios.get('/page/config.json').then(
        response => {
            config = response.data;

            let footerUrl = config['footer'];

            axios.get(footerUrl).then(
                response => {
                    let footerHtml = response.data;
                    globalCache['footer'] = footerHtml;

                    let headerHtml = '<header><div class="menu"><ul>';
                    for (let key in config['header']) {
                        headerHtml += '<li>' + '<a href="#' + key + '">' + key +  "</a>" +  '</li>';
                    }
                    headerHtml += '</ul></div></header>'
                    globalCache['header'] = headerHtml;

                    updateContent();

                    for (let key in config['header']) {
                        if (key !== currentContentKey()) {
                            let url = config['header'][key];
                            axios.get(url).then(
                                response => {
                                    innerHTML = response.data;
                                    globalCache[key] = innerHTML;
                                }
                            )
                        }
                    }

                    window.addEventListener('hashchange', updateContent);
                }
            )
        }
    )
})();