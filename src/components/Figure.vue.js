import { ref } from 'vue';
const __VLS_props = defineProps();
const figureId = ref(`mn-${Math.random().toString(36).substr(2, 9)}`);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_elements.figure, __VLS_elements.figure)({});
if (__VLS_ctx.$slots.default) {
    // @ts-ignore
    [$slots,];
    __VLS_asFunctionalElement(__VLS_elements.label, __VLS_elements.label)({
        for: (__VLS_ctx.figureId),
        ...{ class: "margin-toggle" },
    });
    // @ts-ignore
    [figureId,];
}
if (__VLS_ctx.$slots.default) {
    // @ts-ignore
    [$slots,];
    __VLS_asFunctionalElement(__VLS_elements.input)({
        id: (__VLS_ctx.figureId),
        ...{ class: "margin-toggle" },
        type: "checkbox",
    });
    // @ts-ignore
    [figureId,];
}
if (__VLS_ctx.$slots.default) {
    // @ts-ignore
    [$slots,];
    __VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
        ...{ class: "marginnote" },
    });
    var __VLS_0 = {};
}
__VLS_asFunctionalElement(__VLS_elements.img)({
    src: (__VLS_ctx.src),
    alt: (__VLS_ctx.alt),
});
// @ts-ignore
[src, alt,];
/** @type {__VLS_StyleScopedClasses['margin-toggle']} */ ;
/** @type {__VLS_StyleScopedClasses['margin-toggle']} */ ;
/** @type {__VLS_StyleScopedClasses['marginnote']} */ ;
// @ts-ignore
var __VLS_1 = __VLS_0;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup: () => ({
        figureId: figureId,
    }),
    __typeProps: {},
});
const __VLS_component = (await import('vue')).defineComponent({
    __typeProps: {},
});
export default {};
; /* PartiallyEnd: #4569/main.vue */
