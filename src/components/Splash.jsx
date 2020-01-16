import React, { useState, Fragment } from 'react';
import logo from '../assets/images/logo.svg';
import imgPrismDesc from '../assets/images/section00.svg';
import { useStyles } from '@rootzjs/ui';
import { Styles } from '../styles/Splash';
import { Checkbox } from '@rootzjs/ui';
import { Button } from '@rootzjs/ui';
import { Marker } from '@rootzjs/ui';
import { TermsOfUse } from './TermsOfUse';
import { Icons, IconTypes } from '@rootzjs/ui';
import imgSlack from "../assets/images/slack.svg";

const Component = ({ classes, sid }) => {
    const navigateToOkta = sid !== "" ? "/navigate" : "/sso";
    const navigateToMyid = sid !== "" ? "/navigate" : "/myid";
    const [termsChecked, setTermsChecked] = useState(true);
    const [showTermsOfUsePanel, setShowTermsOfUsePanel] = useState(false);
    const onChecked = disbaled => {
        setTermsChecked(!disbaled);
    }
    const onTermsOfUseClick = () => {
        setShowTermsOfUsePanel(true)
    }
    const onTermsOfUsePanelClose = () => {
        setShowTermsOfUsePanel(false)
    }


    return (
        <Fragment>
            <div className={classes.root}>
                {
                    showTermsOfUsePanel && <TermsOfUse onCloseClick={onTermsOfUsePanelClose} isTermsChecked={termsChecked} acceptTerms={onChecked} />
                }
                <div className={classes.loginPanel}>
                    <div className={classes.loginContainer}>
                        <img className={classes.logo} src={logo} alt="logo" />
                        {sid === "" && <p className={classes.desc}>Login with organisation credentials</p>}
                        <div className={classes.termsNConditionContainer}>
                            <Marker
                                show={!termsChecked}
                                title="Please accept Terms of Use to Proceed with Login"
                            >
                                <Checkbox
                                    onChange={onChecked}
                                    checked={termsChecked}
                                    className={!termsChecked && classes.checkboxError} />
                            </Marker>
                            <span className={classes.termsNConditionText}>By logging in, I agree with &nbsp;
                            <span className={classes.termsAnchor} onClick={onTermsOfUseClick} >Terms of Use</span>
                            </span>
                        </div>
                        <div className={classes.buttonContainer}>
                            {
                                sid !== "" ?
                                    <Fragment>
                                        <Button
                                            text="Okta"
                                            className={classes.starButton}
                                            disabled={!termsChecked}
                                            href={navigateToOkta}
                                        />
                                        <Button
                                            text="MyID"
                                            color="secondary"
                                            className={classes.disneyButton}
                                            disabled={!termsChecked}
                                            href={navigateToMyid}
                                        />
                                    </Fragment>
                                    :
                                    <Button
                                        text="Proceed"
                                        className={classes.starButton}
                                        disabled={!termsChecked}
                                        href={navigateToOkta}
                                    />
                            }

                        </div>
                    </div>
                </div>
                <div className={classes.newsFeedsContainer}>
                    <img className={classes.imgPrismDesc} src={imgPrismDesc} alt="imgPrismDesc" />
                </div>
                <div className={classes.FooterContainer}>
                    <span className={classes.footerSection}>
                        <span>
                            <Icons iconType={IconTypes.mail} className={classes.iconMail} />
                            <a
                                href="mailto:prism@startv.com?subject=Hello Prism"
                                style={{
                                    color: "#888",
                                    textDecoration: "none"
                                }}
                            >prism@startv.com</a>
                        </span>
                    </span>
                    <span className={classes.footerSection}>
                        <span>
                            <img className={classes.imgSlack} src={imgSlack} alt="imgSlack" />
                            <a
                                href="slack://channel?team={T454TCPBL}&id={CBE1DEPCK}"
                                style={{
                                    color: "#888",
                                    textDecoration: "none"
                                }}
                            >#prism_support</a>
                        </span>
                    </span>
                </div>
            </div>
        </Fragment>
    )
}

export const Splash = useStyles(Styles)(Component);


