"use client"
import { useState } from "react";
import BreadCumb from "@/app/component/breadcumb";
import Sidebar from "@/app/component/sidebar";


const PrivacyPolicy = () => {
    const [menu, setMenu] = useState([
        {
            name: 'Home',
            urlPath: '/',
            isIcon: false
        },
        {
            name: 'Privacy Policy',
            urlPath: null,
            isIcon: true
        }
    ])
    return (
        <div className="screen-layer pt-[120px]">
            <BreadCumb menu={menu} />
            <div className="flex gap-[16px] contact-page">
                <div className="w-[20%]">
                    <Sidebar />
                </div>
                <div className="w-[80%] flex-col items-start">
                    <div className="content">
                        <div className="title">
                            <h1>Privacy Policy Maxibook</h1>
                        </div>
                        <div className="desc">
                            <div>
                                <h2>1. Introduction</h2>
                                We strongly respect your privacy. This Privacy Notice details important information regarding the use and disclosure of User information collected on the Maxibook website. Maxibook provides this Privacy Notice to help you make an informed decision about whether to use or continue using Maxibook. Maxibook reserves the right to amend the privacy policy at any time. In case of such amendment, Maxibook shall publishes a relevant notification of such changes on the official Website. <br /> <br />
                                To continue usage of the Maxibook’s services, you will be asked to fill consent application.
                                Maxibook shall gather Personal information only in scope, that is required for providing you with relevant services and that confirms with purposes of such collection.
                                Maxibook shall gather Personal information only for purposes, that are stipulated in this Privacy Policy, or requirements, that follow from applicable law. We dont process Your Personal Information longer, then it is required by applicable law. We do not transfer Your Personal Data to third Parties, except cases, that are mentioned in this Privacy Policy.
                                <br /> <br /> This Privacy Notice is incorporated into and is subject to the Maxibook Terms of Use. Your use of the Maxibook website and any personal information you provide on Maxibook remains subject to the terms of this Privacy Notice and our Terms of Use.
                            </div>
                            <div>
                                <h2>2. Personal Information</h2>
                                We will not give, sell or rent your email address, or any other personal information to third parties at time for any reason without Your prior consent or request for it. Maxibook reserves the right to transfer your personal data to third parties only under official request of competent state bodies, Law enforcement, government officials, or other third parties when Maxibook is compelled to do so by a subpoena, court order, or similar legal procedure; or under other obligatory provisions, that are stipulated in applicable law. <br /> <br />
                                Our primary goals in collecting information are to provide and improve our site, services, features and content, to administer User accounts (Accounts) (together, the Service) and to enable Visitors to enjoy and easily navigate the Maxibook. Considering the fact, that PI includes all information, that can anyway conduce Your identification, we gather next categories of PI about You: When you register with us through the Maxibook, or when you choose to add information to your profile or elect to submit your personal information to third parties through the Maxibook and the Services, we will ask you for personally identifiable information. This refers to information about you that can be used to contact or identify you (Personal Information). Personal Information (also referred as to PI) may include: your name, email address, your national identity and certain information related to your social networks, including login credentials, information regarding web-sites personal account registration.  <br /> <br />
                                Moreover, we collect and store information about posted by Yourself presentations. Such information is deemed to be public since it has been posted. We also gather information regarding messages, that You send us. <br /> <br />
                                We bear no responsibility for re-publishing of previously deleted materials (presentations) by other Users as during first publishing they (materials) became public. For providing ability to use Our services without creating an user account, we collect additional information about You, including, but not limited to information regarding Your device, Your IP address, information about Your Web-browser (for statistics purposes and for improving of the Web-site).

                            </div>
                            <div>
                                <h2>3. Personal Information</h2>
                                We use your Personal Information only: <br /> <br />
                                <ul>
                                    <li>to provide the Services</li>
                                    <li>to administer yours inquiries and requests,</li>
                                    <li>maintaining of statistics, </li>
                                    <li>for improvement of our Web-site,</li>
                                    <li>for personalization of content, that is proposed to You,</li>
                                </ul>
                                You can decide not to submit personal information, in which case we won't be able to make the Maxibook services available to you.
                            </div>
                            <div>
                                <h2>4. Your rights</h2>
                                You have the right to receive information regarding purposes of Personal information collection, regarding third parties, to which we disclose Your personal information, information, regarding safeguards that are applicable for secure storage of Your Personal information, period of time for which Persona information will be stored. <br /> <br />

                                You also have the right to demand erasure of personal data concerning You. Maxibook shall fulfill Your demand in appropriate period of time. If there is no other lawful ground for storing and processing of Your PI, as prescribed in applicable law, Maxibook shall erase such information. If there is another legal ground for such processing, Maxibook shall notify You in appropriate period of time. <br /> <br />

                                You also have the right to demand restriction of the storing and processing of the PI, if legal grounds for such demands have arisen / as prescribed in applicable law. You have the right to object processing of personal data concerning Yourself under circumstances, that are prescribed in applicable law. In case of such objection, Maxibook shall restrain from processing of Your PI, if there will be no other legal grounds for continuing of processing. <br /> <br />

                                You have the right to ask Maxibook for providing You with a structured, list of previously provided PI. You also can ask Maxibook to transmit Your PI to previously chosen third party.
                            </div>
                            <div>
                                <h2>5. Collection of Children’s PI</h2>
                                Children can only use our services under the supervision of their parents/legal guardians and we always suggest minors (under the age of 16) not to submit any personal information to us or use the service. Consent for processing of minor’ PI shall be given by their holder of parental responsibility over the minor. <br /> <br />

                                Personal Maxibook does not knowingly collect or maintain personally identifiable information or non-personally-identifiable information on the Maxibook website from persons under 13 years of age, and no part of our website is directed to persons under 13. If you are under 13 years of age, then please do not use or access the Maxibook website at any time or in any manner. If Maxibook learns that personally identifiable information of persons less than 13 years of age has been collected on the Maxibook website without verified parental consent, then Maxibook will take the appropriate steps to delete this information.
                            </div>
                            <div>
                                <h2>6. Usage of Personal Information</h2>
                                Our privacy policy applies only to the Maxibook website. Maxibook contains links to other sites and file downloads from other sites. We do not exercise control over any site that may be linked to from within content on this site. We are not responsible for the privacy practices or content of such web sites. <br /> <br />

                                We transfer Your Personal Data (PD) to third-party services Google Adsense and Google Analytics for maintain of Website functioning, for content personification and for showing of personalized advertisements. <br /> <br />

                                If you submit personally identifiable information to us through the Maxibook website, then we may use your personal information to operate, maintain, and provide features and functionality of the Maxibook website. <br /> <br />

                                Other information, that does not personally identify you as an individual is collected by Maxibook from the site (such as, by way of example, patterns of use) and is exclusively owned by Maxibook. Maxibook can use this information in such manner that Maxibook, in its sole discretion, deems appropriate. <br /> <br />

                                We may share specific aggregated, non-personal information with third parties, such as the number of users who have registered with us, the volume and pattern of traffic to and within the site, etc. That information will not identify you, the individual, in any way. Any personal information or video and textual content that you voluntarily disclose online (on discussion boards, in messages and comments, within your public profile page, etc.) becomes publicly available and can be collected and used by others. Your account name (not your email address) is displayed to other Users when you upload files or send messages through the Maxibook website and other Users can contact you through messages and comments. Any content that you submit to the Maxibook website may be viewed by the general public. <br /> <br />

                                When you use the Maxibook website, our servers automatically record certain information that your web browser sends whenever you visit any website. These server logs may include information such as your web request, internet protocol (IP) address, browser type, browser language, referring / exit pages and URLs, platform type, number of clicks, domain names, landing pages, pages viewed and the order of those pages, the amount of time spent on particular pages, the date and time of your request, and one or more cookies that may uniquely identify your browser. <br /> <br />

                                We restrict access to personal information to our employees, contractors and agents who need to know that information in order to operate, develop or improve our services. These individuals are bound by confidentiality obligations and may be subject to discipline, including termination and criminal prosecution, if they fail to meet these obligations. You can control and manage PI, that is being provided to the Maxibook via Your personal account by changing privacy settings anytime. <br /> <br />

                                You may update or correct your personal profile information and email preferences at any time by visiting your account profile page. You can also close your account on the Maxibook website. If you close your Maxibook account, we will remove your name and other personally identifiable information from our publicly viewable data. We may retain certain data contributed by you if it may be necessary to prevent fraud or future abuse, or for legitimate business purposes, such as analysis of aggregated, non-personally-identifiable data, account recovery, or if required by applicable law. All retained data will continue to be subject to the terms of the Maxibook Privacy Policy that you have previously agreed to. To request that we close your account and remove your information from the Maxibook service, please send your request. Please send your request using an email account that you have registered with Maxibook under your name. <br /> <br />

                                When you send email or other communication to us, we may retain those communications in order to process your inquiries, respond to your requests and improve our services. We won't share any information you send to us in those communications with any third parties. <br /> <br />

                                We use cookies and log file information to: (a) remember information so that you will not have to re-enter it during your visit or the next time you visit Maxibook; (b) provide custom, personalized content and information; (c) monitor the effectiveness of our marketing campaigns; (d) monitor aggregate metrics such as total number of visitors, pages viewed, etc.; and (e) track your entries, submissions, and status in promotions, sweepstakes, and contests.
                            </div>
                            <div>
                                <h2>7. Protection of the Personal Information</h2>
                                Maxibook uses store and process Your PI on Maxibook servers in various jurisdictions, where our facilities and/or service providers are located. By filling a “consent application “You agree to this transfer, storing, or processing. Maxibook will take all steps reasonably necessary to ensure that Your Personal Data is treated securely and in accordance with this Policy. Maxibook protect Your Personal Data under internationally acknowledged standards, using physical, technical, and administrative security measures to reduce the risks of loss, misuse, unauthorized access, disclosure, and alteration. Some of the safeguards Maxibook use are firewalls and data encryption, physical access controls to our data centers, and information access authorization controls. Maxibook also authorize access to Personal Data only for those employees or contractors who require it to fulfill their job or service responsibilities. All of our physical, electronic, and procedural safeguards are designed to comply with applicable laws and regulations. Third parties may be located in other countries where the laws on processing of Personal Data may be less stringent than in Your country. From time to time, the Personal Data may be also stored in other locations, and in such cases, Maxibook will ensure that the Personal Data (PD) will be stored and processed with the reasonable level of care and security.<br /> <br />

                                We also point your attention to the fact that we are obliged to make back-ups. Therefore, Your PD is also kept in such back-ups with respect to all safety and legal requirements. We store PD in logs during 3 weeks. We store Your PD in back-ups during 5 years. Moreover, Your PD are also stored in Google Analytics during 50 months.
                            </div>
                            <div>
                                <h2>8. Amendments to the Privacy Policy</h2>
                                Please note that this privacy policy may change from time to time. We will not reduce your rights under this policy without your explicit consent, and we expect most such changes will be minor. Regardless, we will post any policy changes on this page and, if the changes are significant, we will provide a more prominent notice. To continue usage of the Maxibook’s services, You will be asked to fill consent application.
                            </div>
                            <div>
                                <h2>9. Contact us</h2>
                                If you have any questions about this policy, please feel free to contact us or to write to us at: <b>infohijra4@gmail.com</b>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PrivacyPolicy;