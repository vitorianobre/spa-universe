export class Router {
    routes = {}

    add(routeName, page) {
        this.routes[routeName] = page
    }

    route(event) {
        event = event || window.event;
        event.preventDefault();
    
        window.history.pushState({}, "", event.target.href)
    
        this.handle();
        this.makeLinkActive();
    }

    handle() {
        const { pathname } = window.location
        const route = this.routes[pathname] || this.routes[404]
    
        fetch(route)
        .then(data => data.text())
        .then(html => {
            document.querySelector('#app').innerHTML = html
        })
    }

    makeLinkActive() {
        document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'))
        
        const { pathname } = window.location;
    
        const currentLink = document.querySelector(`a[href="${pathname}"]`);
        currentLink.classList.add("active");
    }
}

