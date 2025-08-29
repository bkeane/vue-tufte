import { ref } from 'vue';
const __VLS_props = defineProps();
const marginFigureId = ref(`mn-figure-${Math.random().toString(36).substr(2, 9)}`);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_elements.label, __VLS_elements.label)({
    for: (__VLS_ctx.marginFigureId),
    ...{ class: "margin-toggle" },
});
// @ts-ignore
[marginFigureId,];
__VLS_asFunctionalElement(__VLS_elements.input)({
    id: (__VLS_ctx.marginFigureId),
    ...{ class: "margin-toggle" },
    type: "checkbox",
});
// @ts-ignore
[marginFigureId,];
__VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
    ...{ class: "marginnote" },
});
__VLS_asFunctionalElement(__VLS_elements.img)({
    src: (__VLS_ctx.src),
    alt: (__VLS_ctx.alt),
});
// @ts-ignore
[src, alt,];
var __VLS_0 = {};
(__VLS_ctx.caption);
// @ts-ignore
[caption,];
/** @type {__VLS_StyleScopedClasses['margin-toggle']} */ ;
/** @type {__VLS_StyleScopedClasses['margin-toggle']} */ ;
/** @type {__VLS_StyleScopedClasses['marginnote']} */ ;
// @ts-ignore
var __VLS_1 = __VLS_0;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup: () => ({
        marginFigureId: marginFigureId,
    }),
    __typeProps: {},
});
const __VLS_component = (await import('vue')).defineComponent({
    __typeProps: {},
});
export default {};
; /* PartiallyEnd: #4569/main.vue */
