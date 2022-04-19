export default function ({ store }, inject) {
    inject("isMobile", () => window.matchMedia("(max-width: 768px)").matches)
}
