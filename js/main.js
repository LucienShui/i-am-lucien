let config = null;
let divMap = {};
let currentkey = null;

function currentContentKey() {
    return location.hash === '' ? '/' : location.hash.substring(1);
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
    let key = currentContentKey();
    if (!(key in config['header'])) {
        location.hash = '#/';
        return null;
    }

    if (currentkey !== null && currentkey in divMap) {
        divMap[currentkey].hidden = true;
    }
    currentkey = key;

    if (key in divMap) {
        divMap[key].hidden = false;
    } else {
        let url = config['header'][key];
        axios.get(url).then(
            response => {
                innerHTML = response.data;
                let div = document.createElement('div');
                div.innerHTML = innerHTML;

                divMap[key] = div;

                let containerContent = document.getElementById('container-content');
                containerContent.appendChild(div);

                currentkey = key;

                let scriptList = Array.prototype.slice.call(div.getElementsByTagName('script'));
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

                    let headerHtml = '<header><div class="menu"><ul>';
                    for (let key in config['header']) {
                        headerHtml += '<li>' + '<a href="#' + key + '">' + key +  "</a>" +  '</li>';
                    }
                    headerHtml += '</ul></div></header>'

                    document.getElementById('container-footer').innerHTML = footerHtml;
                    document.getElementById('container-header').innerHTML = headerHtml;
                    updateContent();

                    for (let key in config['header']) {
                        if (key !== currentContentKey()) {
                            let url = config['header'][key];
                            axios.get(url).then(
                                response => {
                                    innerHTML = response.data;
                                    
                                    let div = document.createElement('div');

                                    div.innerHTML = innerHTML;
                                    div.hidden = true;

                                    divMap[key] = div;

                                    let containerContent = document.getElementById('container-content');
                                    containerContent.appendChild(div);
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