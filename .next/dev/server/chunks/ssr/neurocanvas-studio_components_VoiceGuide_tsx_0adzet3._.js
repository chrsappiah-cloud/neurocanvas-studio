module.exports = [
"[project]/neurocanvas-studio/components/VoiceGuide.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "VoiceGuide",
    ()=>VoiceGuide
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$neurocanvas$2d$studio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/neurocanvas-studio/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$neurocanvas$2d$studio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/neurocanvas-studio/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
const steps = [
    'Welcome. Tap the glowing cards to begin painting or drawing.',
    'Choose calm music before starting your art session.',
    'Use large controls and simple wording designed for cognitive accessibility.',
    'A caregiver can review saved sessions from the dashboard at any time.'
];
function VoiceGuide() {
    const [active, setActive] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$neurocanvas$2d$studio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const speak = (index)=>{
        setActive(index);
        if (("TURBOPACK compile-time value", "undefined") !== 'undefined' && 'speechSynthesis' in window) //TURBOPACK unreachable
        ;
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neurocanvas$2d$studio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
        "aria-live": "polite",
        className: "voiceGuide",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$neurocanvas$2d$studio$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            children: "For accessibility, use keyboard navigation and screen reader support is enabled."
        }, void 0, false, {
            fileName: "[project]/neurocanvas-studio/components/VoiceGuide.tsx",
            lineNumber: 31,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/neurocanvas-studio/components/VoiceGuide.tsx",
        lineNumber: 30,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=neurocanvas-studio_components_VoiceGuide_tsx_0adzet3._.js.map