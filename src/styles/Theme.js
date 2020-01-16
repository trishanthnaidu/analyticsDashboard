const starColorCode = "#ff9602"
const disneyColorCode = "#3ca0e0"
const starOnHoverColorCode = "#f18d00"
const disneyOnHoverColorCode = "#358cc3"
const textMain = "#222";
const textSub = "#888";
const textSub2 = "#666";
const footerColorCode = "#eee";
const errorCode = "#CD0000";
const white = "#fff";
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

const btnOnHover = {
    color: "white",
    transition: "box-shadow .28s cubic-bezier(0.4,0.0,0.2,1)",
    boxShadow: "0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2)"
}
const onHover = {
    "&:hover": {
        ...btnOnHover,
        ...{ backgroundColor: starOnHoverColorCode }
    }
}
const primaryBtn = {
    color: "white",
    boxShadow: "none",
    textTransform: "uppercase",
    ...onHover,
}
const startPrimaryBtn = {
    ...primaryBtn,
    ...onHover,
    backgroundColor: starColorCode,
    display: "inline-block"
}
const disneyPrimaryBtn = {
    ...primaryBtn,
    backgroundColor: disneyColorCode,
    display: "inline-block"
}

export const AppTheme = {
    palette: {
        primary: {
            main: starColorCode,
        },
        secondary: {
            main: disneyColorCode,
        },
        error: {
            main: errorCode
        },
    },
    title: {
        main: textMain,
        sub: textSub,
        sub2: textSub2,
        contrast: white
    },
    background: {
        default: white,
        fade: footerColorCode,
        footer: footerColorCode
    },
    shadow: {
        main: "0 1px 1px 0 rgba(0,0,0,0.2)",
        insetNOutset: "0 1px 1px 0 rgba(0,0,0,0.2), rgba(0,0,0,0.2) 0px 0px 3px inset",
        inset: "rgba(0,0,0,0.2) 0px 0px 3px inset"
    },
    markers: {
        error: {
            title: {
                color: textMain,
                fontSize: 12,
                fontFamily: "cadiz-bold"
            },
            body: {
                color: textSub,
                fontSize: 12
            }
        },
    },
    star: {
        btn: {
            primary: startPrimaryBtn,
            splashNavigatoryBtn: {
                ...startPrimaryBtn,
                ...onHover,
                ...{ fontSize: 18 },
                width: "40%",
                height: 40,
                padding: 4,
                textAlign: "center"
            }
        },
        color: {
            primary: starColorCode
        }
    },
    disney: {
        btn: {
            primary: disneyPrimaryBtn,
            splashNavigatoryBtn: {
                ...disneyPrimaryBtn,
                ...{ fontSize: 18 },
                width: "40%",
                height: 40,
                padding: 4,
                textAlign: "center",

                "&:hover": {
                    ...btnOnHover,
                    ...{ backgroundColor: disneyOnHoverColorCode }
                }
            }
        },
        color: {
            primary: disneyColorCode
        }
    },
    animation: {
        bounce: "bounce 400ms linear both",
        swayRTL: "swayLeftToRight 1000ms linear both",
        swayLTR: "swayRightToLeft 1000ms linear both",
        eyeBlink: "eyeBlink 4800ms linear infinite both",
        appearBTT: "appearBTT 0.7s ease-in both;",
    },
    hover: {
        primary: starOnHoverColorCode
    },
    isMobile
}