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

function updateContent() {
    let outerHashKey = currentContentKey();
    if (!(outerHashKey in config['header'])) {
        location.hash = '#/';
        return null;
    }

    if (outerHashKey in globalCache) {
        document.getElementById('container-content').innerHTML = globalCache[outerHashKey];
        setHeaderAndFooter();
    } else {
        let url = config['header'][outerHashKey];
        axios.get(url).then(
            response => {
                let innerHashKey = currentContentKey();
                innerHTML = response.data;
                globalCache[innerHashKey] = innerHTML;
                document.getElementById('container-content').innerHTML = globalCache[innerHashKey];
                setHeaderAndFooter();
            }
        )
    }
}

function main() {
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
}

main();