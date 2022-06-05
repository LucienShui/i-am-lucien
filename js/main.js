let config = null;
let divMap = {};
let scriptListMap = {};
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
        if (key in scriptListMap) {
            scriptListMap[key].forEach(function (script) { eval(script.innerHTML); });
            delete scriptListMap[key];
        }
    } else {
        let url = config['header'][key];
        get(url).then(response => {
            let div = document.createElement('div');
            div.innerHTML = response;

            divMap[key] = div;

            let containerContent = document.getElementById('container-content');
            containerContent.appendChild(div);

            currentkey = key;

            let scriptList = Array.prototype.slice.call(div.getElementsByTagName('script'));
            scriptList.forEach(function (script) { eval(script.innerHTML); });
        })
    }
}

(function () {
    if (location.hash === '') {
        location.hash = '#/'
    }

    get('/page/config.json').then(response => {
        config = response;

        let footerUrl = config['footer'];

        get(footerUrl).then(response => {
            let headerHtml = '<header><div class="menu"><ul>';
            for (let key in config['header']) {
                headerHtml += '<li>' + '<a href="#' + key + '">' + key +  "</a>" +  '</li>';
            }
            headerHtml += '</ul></div></header>'
            
            document.getElementById('container-header').innerHTML = headerHtml;
            document.getElementById('container-footer').innerHTML = response;
            updateContent();

            for (let key in config['header']) {
                if (key !== currentContentKey()) {
                    let url = config['header'][key];
                    get(url).then(response => {
                        let div = document.createElement('div');

                        div.innerHTML = response;
                        div.hidden = true;

                        divMap[key] = div;

                        let containerContent = document.getElementById('container-content');
                        containerContent.appendChild(div);

                        let scriptList = Array.prototype.slice.call(div.getElementsByTagName('script'));
                        scriptListMap[key] = scriptList;
                    })
                }
            }

            window.addEventListener('hashchange', updateContent);
        })
    })
})();