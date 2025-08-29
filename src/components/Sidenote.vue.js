import { ref } from 'vue';
const sidenoteId = ref(`sn-${Math.random().toString(36).substr(2, 9)}`);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_elements.label, __VLS_elements.label)({
    for: (__VLS_ctx.sidenoteId),
    ...{ class: "margin-toggle sidenote-number" },
});
// @ts-ignore
[sidenoteId,];
__VLS_asFunctionalElement(__VLS_elements.input)({
    id: (__VLS_ctx.sidenoteId),
    ...{ class: "margin-toggle" },
    type: "checkbox",
});
// @ts-ignore
[sidenoteId,];
__VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
    ...{ class: "sidenote" },
});
var __VLS_0 = {};
/** @type {__VLS_StyleScopedClasses['margin-toggle']} */ ;
/** @type {__VLS_StyleScopedClasses['sidenote-number']} */ ;
/** @type {__VLS_StyleScopedClasses['margin-toggle']} */ ;
/** @type {__VLS_StyleScopedClasses['sidenote']} */ ;
// @ts-ignore
var __VLS_1 = __VLS_0;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup: () => ({
        sidenoteId: sidenoteId,
    }),
});
const __VLS_component = (await import('vue')).defineComponent({});
export default {};
; /* PartiallyEnd: #4569/main.vue */
