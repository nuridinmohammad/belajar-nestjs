'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">belajar-nest documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-91e0e4ded7b843287b9fb8a2f09fcb9508faf172bc966b3263c74c2ee3c0ebb45180e4c2ce45d611306e3c3d101bfad3ad89f6f2648e504ffe5cd051c06114ea"' : 'data-bs-target="#xs-controllers-links-module-AppModule-91e0e4ded7b843287b9fb8a2f09fcb9508faf172bc966b3263c74c2ee3c0ebb45180e4c2ce45d611306e3c3d101bfad3ad89f6f2648e504ffe5cd051c06114ea"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-91e0e4ded7b843287b9fb8a2f09fcb9508faf172bc966b3263c74c2ee3c0ebb45180e4c2ce45d611306e3c3d101bfad3ad89f6f2648e504ffe5cd051c06114ea"' :
                                            'id="xs-controllers-links-module-AppModule-91e0e4ded7b843287b9fb8a2f09fcb9508faf172bc966b3263c74c2ee3c0ebb45180e4c2ce45d611306e3c3d101bfad3ad89f6f2648e504ffe5cd051c06114ea"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-91e0e4ded7b843287b9fb8a2f09fcb9508faf172bc966b3263c74c2ee3c0ebb45180e4c2ce45d611306e3c3d101bfad3ad89f6f2648e504ffe5cd051c06114ea"' : 'data-bs-target="#xs-injectables-links-module-AppModule-91e0e4ded7b843287b9fb8a2f09fcb9508faf172bc966b3263c74c2ee3c0ebb45180e4c2ce45d611306e3c3d101bfad3ad89f6f2648e504ffe5cd051c06114ea"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-91e0e4ded7b843287b9fb8a2f09fcb9508faf172bc966b3263c74c2ee3c0ebb45180e4c2ce45d611306e3c3d101bfad3ad89f6f2648e504ffe5cd051c06114ea"' :
                                        'id="xs-injectables-links-module-AppModule-91e0e4ded7b843287b9fb8a2f09fcb9508faf172bc966b3263c74c2ee3c0ebb45180e4c2ce45d611306e3c3d101bfad3ad89f6f2648e504ffe5cd051c06114ea"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-419a77ce2efc66dd20eccb3103bc38b4902cf4f747cae3f846a07a93b245d2b2c495129c6a37232b4e4b450651f42ee99c84d505da371f3e86bb3692eb368ece"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-419a77ce2efc66dd20eccb3103bc38b4902cf4f747cae3f846a07a93b245d2b2c495129c6a37232b4e4b450651f42ee99c84d505da371f3e86bb3692eb368ece"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-419a77ce2efc66dd20eccb3103bc38b4902cf4f747cae3f846a07a93b245d2b2c495129c6a37232b4e4b450651f42ee99c84d505da371f3e86bb3692eb368ece"' :
                                            'id="xs-controllers-links-module-AuthModule-419a77ce2efc66dd20eccb3103bc38b4902cf4f747cae3f846a07a93b245d2b2c495129c6a37232b4e4b450651f42ee99c84d505da371f3e86bb3692eb368ece"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-419a77ce2efc66dd20eccb3103bc38b4902cf4f747cae3f846a07a93b245d2b2c495129c6a37232b4e4b450651f42ee99c84d505da371f3e86bb3692eb368ece"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-419a77ce2efc66dd20eccb3103bc38b4902cf4f747cae3f846a07a93b245d2b2c495129c6a37232b4e4b450651f42ee99c84d505da371f3e86bb3692eb368ece"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-419a77ce2efc66dd20eccb3103bc38b4902cf4f747cae3f846a07a93b245d2b2c495129c6a37232b4e4b450651f42ee99c84d505da371f3e86bb3692eb368ece"' :
                                        'id="xs-injectables-links-module-AuthModule-419a77ce2efc66dd20eccb3103bc38b4902cf4f747cae3f846a07a93b245d2b2c495129c6a37232b4e4b450651f42ee99c84d505da371f3e86bb3692eb368ece"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtStrategy</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PrismaModule.html" data-type="entity-link" >PrismaModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PrismaModule-0a30996d1235bf2604a3c3e09c8f1199d43cb26cc3a3c409db2ea23ad71bf181806b1da96cfc90d204e717a917b83b7d35bd1c8bff82b9170de5064b4a322113"' : 'data-bs-target="#xs-injectables-links-module-PrismaModule-0a30996d1235bf2604a3c3e09c8f1199d43cb26cc3a3c409db2ea23ad71bf181806b1da96cfc90d204e717a917b83b7d35bd1c8bff82b9170de5064b4a322113"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PrismaModule-0a30996d1235bf2604a3c3e09c8f1199d43cb26cc3a3c409db2ea23ad71bf181806b1da96cfc90d204e717a917b83b7d35bd1c8bff82b9170de5064b4a322113"' :
                                        'id="xs-injectables-links-module-PrismaModule-0a30996d1235bf2604a3c3e09c8f1199d43cb26cc3a3c409db2ea23ad71bf181806b1da96cfc90d204e717a917b83b7d35bd1c8bff82b9170de5064b4a322113"' }>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/SchoolModule.html" data-type="entity-link" >SchoolModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-SchoolModule-7ab72fe3ac05b352c96677580ec3d28f5580ca037e43771534ca586f37a96041c315dca8af325a296661b52f1f78720bc20c2423c7cdd1cfbe3c738ff87a509d"' : 'data-bs-target="#xs-controllers-links-module-SchoolModule-7ab72fe3ac05b352c96677580ec3d28f5580ca037e43771534ca586f37a96041c315dca8af325a296661b52f1f78720bc20c2423c7cdd1cfbe3c738ff87a509d"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-SchoolModule-7ab72fe3ac05b352c96677580ec3d28f5580ca037e43771534ca586f37a96041c315dca8af325a296661b52f1f78720bc20c2423c7cdd1cfbe3c738ff87a509d"' :
                                            'id="xs-controllers-links-module-SchoolModule-7ab72fe3ac05b352c96677580ec3d28f5580ca037e43771534ca586f37a96041c315dca8af325a296661b52f1f78720bc20c2423c7cdd1cfbe3c738ff87a509d"' }>
                                            <li class="link">
                                                <a href="controllers/SchoolController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SchoolController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-SchoolModule-7ab72fe3ac05b352c96677580ec3d28f5580ca037e43771534ca586f37a96041c315dca8af325a296661b52f1f78720bc20c2423c7cdd1cfbe3c738ff87a509d"' : 'data-bs-target="#xs-injectables-links-module-SchoolModule-7ab72fe3ac05b352c96677580ec3d28f5580ca037e43771534ca586f37a96041c315dca8af325a296661b52f1f78720bc20c2423c7cdd1cfbe3c738ff87a509d"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-SchoolModule-7ab72fe3ac05b352c96677580ec3d28f5580ca037e43771534ca586f37a96041c315dca8af325a296661b52f1f78720bc20c2423c7cdd1cfbe3c738ff87a509d"' :
                                        'id="xs-injectables-links-module-SchoolModule-7ab72fe3ac05b352c96677580ec3d28f5580ca037e43771534ca586f37a96041c315dca8af325a296661b52f1f78720bc20c2423c7cdd1cfbe3c738ff87a509d"' }>
                                        <li class="link">
                                            <a href="injectables/SchoolService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SchoolService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/TaskModule.html" data-type="entity-link" >TaskModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-TaskModule-e9e2935bdbfb63264cdc4512a991c684734eaa03949d7cb7d9fd07d8c1e5ef05d589fde37d81b530f574525ee4c75172f6212bb95b44ee43f645a6e4f1f4468f"' : 'data-bs-target="#xs-controllers-links-module-TaskModule-e9e2935bdbfb63264cdc4512a991c684734eaa03949d7cb7d9fd07d8c1e5ef05d589fde37d81b530f574525ee4c75172f6212bb95b44ee43f645a6e4f1f4468f"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-TaskModule-e9e2935bdbfb63264cdc4512a991c684734eaa03949d7cb7d9fd07d8c1e5ef05d589fde37d81b530f574525ee4c75172f6212bb95b44ee43f645a6e4f1f4468f"' :
                                            'id="xs-controllers-links-module-TaskModule-e9e2935bdbfb63264cdc4512a991c684734eaa03949d7cb7d9fd07d8c1e5ef05d589fde37d81b530f574525ee4c75172f6212bb95b44ee43f645a6e4f1f4468f"' }>
                                            <li class="link">
                                                <a href="controllers/TaskController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TaskController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-TaskModule-e9e2935bdbfb63264cdc4512a991c684734eaa03949d7cb7d9fd07d8c1e5ef05d589fde37d81b530f574525ee4c75172f6212bb95b44ee43f645a6e4f1f4468f"' : 'data-bs-target="#xs-injectables-links-module-TaskModule-e9e2935bdbfb63264cdc4512a991c684734eaa03949d7cb7d9fd07d8c1e5ef05d589fde37d81b530f574525ee4c75172f6212bb95b44ee43f645a6e4f1f4468f"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-TaskModule-e9e2935bdbfb63264cdc4512a991c684734eaa03949d7cb7d9fd07d8c1e5ef05d589fde37d81b530f574525ee4c75172f6212bb95b44ee43f645a6e4f1f4468f"' :
                                        'id="xs-injectables-links-module-TaskModule-e9e2935bdbfb63264cdc4512a991c684734eaa03949d7cb7d9fd07d8c1e5ef05d589fde37d81b530f574525ee4c75172f6212bb95b44ee43f645a6e4f1f4468f"' }>
                                        <li class="link">
                                            <a href="injectables/TaskService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TaskService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AuthGuard.html" data-type="entity-link" >AuthGuard</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateSchoolDto.html" data-type="entity-link" >CreateSchoolDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateTaskDto.html" data-type="entity-link" >CreateTaskDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoginDto.html" data-type="entity-link" >LoginDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/RegisterDto.html" data-type="entity-link" >RegisterDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/School.html" data-type="entity-link" >School</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateSchoolDto.html" data-type="entity-link" >UpdateSchoolDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateTaskDto.html" data-type="entity-link" >UpdateTaskDto</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/Task.html" data-type="entity-link" >Task</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});