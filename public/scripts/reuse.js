class Nav extends HTMLElement {

    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
            <div class="nav">
                <h1>Radio Station Site</h1>
                <ul>
                    <li>
                        <a href="index.html">
                            <i class="bi bi-house-door-fill"></i>
                        </a>
                    </li>
                    <li>
                        <a href="#">Songs</a>
                    </li>
                    <li>
                        <a href="contact-us.html">Contact Us</a>
                    </li>
                </ul>
            </div>
        `
    }

}

class Footer extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
            <div class="footer">
                <h1 class="footer-title">Radio Station Site</h1>
                <ul class="social">
                    <li>
                        <a href="#">
                            <i class="bi bi-facebook"></i>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <i class="bi bi-instagram"></i>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <i class="bi bi-twitter-x"></i>
                        </a>
                    </li>
                </ul>
                <div class="bottom-nav-section">
                    <h1>Navigation</h1>
                    <ul>
                        <li>
                            <a href="#">Home</a>
                        </li>
                        <li>
                            <a href="#">Songs</a>
                        </li>
                        <li>
                            <a href="#">Contact Us</a>
                        </li>
                    </ul>
                </div>
            </div>
        `
    }

}

customElements.define('main-nav', Nav);
customElements.define('main-footer', Footer);