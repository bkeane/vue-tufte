import { ref, onMounted, onUnmounted } from 'vue';
const props = withDefaults(defineProps(), {
    delimiter: ' · ',
    placement: 'top-right',
    sticky: false
});
const mobileMenuOpen = ref(false);
// Sticky navigation logic
const showStickyNav = ref(false);
const handleScroll = () => {
    if (props.sticky) {
        // Find all Nav components in the DOM
        const allNavs = document.querySelectorAll('.tufte-nav');
        const currentNav = document.querySelector(`[data-sticky="${props.sticky}"]`);
        // Find the first non-sticky nav (header nav) to use as reference
        const referenceNav = Array.from(allNavs).find(nav => !nav.hasAttribute('data-sticky') || nav.getAttribute('data-sticky') === 'false');
        // Only show sticky nav if we have a reference nav and it's scrolled out of view
        if (referenceNav) {
            const headerBottom = referenceNav.getBoundingClientRect().bottom + window.scrollY;
            showStickyNav.value = window.scrollY > headerBottom;
        }
    }
};
onMounted(() => {
    if (props.sticky) {
        window.addEventListener('scroll', handleScroll);
        handleScroll();
    }
});
onUnmounted(() => {
    if (props.sticky) {
        window.removeEventListener('scroll', handleScroll);
    }
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_withDefaultsArg = (function (t) { return t; })({
    delimiter: ' · ',
    placement: 'top-right',
    sticky: false
});
const __VLS_ctx = {};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_elements.nav, __VLS_elements.nav)({
    ...{ class: "tufte-nav" },
    ...{ class: ({
            'force-mobile': __VLS_ctx.burger === true,
            'force-desktop': __VLS_ctx.burger === false,
            'sticky-active': __VLS_ctx.sticky && __VLS_ctx.showStickyNav
        }) },
    'data-sticky': (__VLS_ctx.sticky),
    ...{ style: ({
            '--delimiter': `'${__VLS_ctx.delimiter}'`,
            position: __VLS_ctx.sticky && __VLS_ctx.showStickyNav ? 'fixed' : 'static',
            top: __VLS_ctx.sticky && __VLS_ctx.showStickyNav ? '1rem' : 'auto',
            right: __VLS_ctx.sticky && __VLS_ctx.showStickyNav ? '1rem' : 'auto',
            zIndex: __VLS_ctx.sticky && __VLS_ctx.showStickyNav ? '2000' : 'auto'
        }) },
});
__VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (!__VLS_ctx.sticky || __VLS_ctx.showStickyNav) }, null, null);
// @ts-ignore
[burger, burger, sticky, sticky, sticky, sticky, sticky, sticky, sticky, showStickyNav, showStickyNav, showStickyNav, showStickyNav, showStickyNav, showStickyNav, delimiter, vShow,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "nav-desktop" },
});
var __VLS_0 = {};
if (__VLS_ctx.github) {
    // @ts-ignore
    [github,];
    __VLS_asFunctionalElement(__VLS_elements.a, __VLS_elements.a)({
        href: (__VLS_ctx.github),
        target: "_blank",
        rel: "noopener noreferrer",
        ...{ class: "github-link" },
    });
    // @ts-ignore
    [github,];
    __VLS_asFunctionalElement(__VLS_elements.svg, __VLS_elements.svg)({
        width: "16",
        height: "16",
        viewBox: "0 0 16 16",
        fill: "currentColor",
        'aria-label': "GitHub",
    });
    __VLS_asFunctionalElement(__VLS_elements.path)({
        d: "M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z",
    });
}
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "mobile-menu" },
    ...{ class: ([
            { 'mobile-menu-expanded': __VLS_ctx.mobileMenuOpen },
            { 'mobile-menu-inline': __VLS_ctx.inline },
            `mobile-menu-${__VLS_ctx.placement}`
        ]) },
});
// @ts-ignore
[mobileMenuOpen, inline, placement,];
__VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.mobileMenuOpen = !__VLS_ctx.mobileMenuOpen;
            // @ts-ignore
            [mobileMenuOpen, mobileMenuOpen,];
        } },
    ...{ class: "hamburger-button" },
    'aria-expanded': (__VLS_ctx.mobileMenuOpen),
    'aria-label': "Toggle navigation menu",
});
// @ts-ignore
[mobileMenuOpen,];
__VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
    ...{ class: "hamburger-line" },
    ...{ class: ({ 'hamburger-line-active': __VLS_ctx.mobileMenuOpen }) },
});
// @ts-ignore
[mobileMenuOpen,];
__VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
    ...{ class: "hamburger-line" },
    ...{ class: ({ 'hamburger-line-active': __VLS_ctx.mobileMenuOpen }) },
});
// @ts-ignore
[mobileMenuOpen,];
__VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
    ...{ class: "hamburger-line" },
    ...{ class: ({ 'hamburger-line-active': __VLS_ctx.mobileMenuOpen }) },
});
// @ts-ignore
[mobileMenuOpen,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "mobile-menu-content" },
});
__VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.mobileMenuOpen) }, null, null);
// @ts-ignore
[vShow, mobileMenuOpen,];
var __VLS_2 = {};
if (__VLS_ctx.github) {
    // @ts-ignore
    [github,];
    __VLS_asFunctionalElement(__VLS_elements.a, __VLS_elements.a)({
        href: (__VLS_ctx.github),
        target: "_blank",
        rel: "noopener noreferrer",
        ...{ class: "github-link" },
    });
    // @ts-ignore
    [github,];
    __VLS_asFunctionalElement(__VLS_elements.svg, __VLS_elements.svg)({
        width: "16",
        height: "16",
        viewBox: "0 0 16 16",
        fill: "currentColor",
        'aria-label': "GitHub",
    });
    __VLS_asFunctionalElement(__VLS_elements.path)({
        d: "M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z",
    });
}
/** @type {__VLS_StyleScopedClasses['tufte-nav']} */ ;
/** @type {__VLS_StyleScopedClasses['force-mobile']} */ ;
/** @type {__VLS_StyleScopedClasses['force-desktop']} */ ;
/** @type {__VLS_StyleScopedClasses['sticky-active']} */ ;
/** @type {__VLS_StyleScopedClasses['nav-desktop']} */ ;
/** @type {__VLS_StyleScopedClasses['github-link']} */ ;
/** @type {__VLS_StyleScopedClasses['mobile-menu']} */ ;
/** @type {__VLS_StyleScopedClasses['mobile-menu-expanded']} */ ;
/** @type {__VLS_StyleScopedClasses['mobile-menu-inline']} */ ;
/** @type {__VLS_StyleScopedClasses['hamburger-button']} */ ;
/** @type {__VLS_StyleScopedClasses['hamburger-line']} */ ;
/** @type {__VLS_StyleScopedClasses['hamburger-line-active']} */ ;
/** @type {__VLS_StyleScopedClasses['hamburger-line']} */ ;
/** @type {__VLS_StyleScopedClasses['hamburger-line-active']} */ ;
/** @type {__VLS_StyleScopedClasses['hamburger-line']} */ ;
/** @type {__VLS_StyleScopedClasses['hamburger-line-active']} */ ;
/** @type {__VLS_StyleScopedClasses['mobile-menu-content']} */ ;
/** @type {__VLS_StyleScopedClasses['github-link']} */ ;
// @ts-ignore
var __VLS_1 = __VLS_0, __VLS_3 = __VLS_2;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup: () => ({
        mobileMenuOpen: mobileMenuOpen,
        showStickyNav: showStickyNav,
    }),
    __typeProps: {},
    props: {},
});
const __VLS_component = (await import('vue')).defineComponent({
    __typeProps: {},
    props: {},
});
export default {};
; /* PartiallyEnd: #4569/main.vue */
