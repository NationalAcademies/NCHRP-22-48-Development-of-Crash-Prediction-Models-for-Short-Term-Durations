function renderNavs(navs, paths, endRecursion = false, matchedPaths = []) {
    if (paths.length === 0) {
        return  '';
    }
    let prefix = '/' + matchedPaths.join('/');
    let liDoms = ``;
    let currentPath = paths[0];
    let remainingPaths = [];
    let activated = false;

    if (prefix === '/') {
        prefix = ''
    }

    for (let nav of navs) {
        if (nav.path !== currentPath) {
            liDoms += `<li><p><a href="${prefix}/${nav.path}">${nav.path}</a></p></li>`;
        } else {
            remainingPaths = paths.slice(1);

            if (remainingPaths.length === 0 && !endRecursion) {
                activated = nav.path === currentPath;
            }
            if (remainingPaths.length === 0 && nav.children.length > 0 && !endRecursion) {
                remainingPaths.push(nav.children[0].path);
                endRecursion = true;
            }
            liDoms += `
                <li>
                    <p class="${activated ? 'activated' : 'inactivated'}"><a href="${prefix}/${nav.path}">${nav.path}</a></p>
                    ${renderNavs(nav.children, remainingPaths, endRecursion, [...matchedPaths, nav.path])}
                </li>`
        }
    }
    return `<ul>${liDoms}</ul>`
}

module.exports = {
    renderNavs
}