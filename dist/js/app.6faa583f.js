(function(e){function a(a){for(var r,i,n=a[0],c=a[1],l=a[2],u=0,p=[];u<n.length;u++)i=n[u],Object.prototype.hasOwnProperty.call(o,i)&&o[i]&&p.push(o[i][0]),o[i]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(e[r]=c[r]);d&&d(a);while(p.length)p.shift()();return s.push.apply(s,l||[]),t()}function t(){for(var e,a=0;a<s.length;a++){for(var t=s[a],r=!0,n=1;n<t.length;n++){var c=t[n];0!==o[c]&&(r=!1)}r&&(s.splice(a--,1),e=i(i.s=t[0]))}return e}var r={},o={app:0},s=[];function i(a){if(r[a])return r[a].exports;var t=r[a]={i:a,l:!1,exports:{}};return e[a].call(t.exports,t,t.exports,i),t.l=!0,t.exports}i.m=e,i.c=r,i.d=function(e,a,t){i.o(e,a)||Object.defineProperty(e,a,{enumerable:!0,get:t})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,a){if(1&a&&(e=i(e)),8&a)return e;if(4&a&&"object"===typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(i.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&a&&"string"!=typeof e)for(var r in e)i.d(t,r,function(a){return e[a]}.bind(null,r));return t},i.n=function(e){var a=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(a,"a",a),a},i.o=function(e,a){return Object.prototype.hasOwnProperty.call(e,a)},i.p="/";var n=window["webpackJsonp"]=window["webpackJsonp"]||[],c=n.push.bind(n);n.push=a,n=n.slice();for(var l=0;l<n.length;l++)a(n[l]);var d=c;s.push([0,"chunk-vendors"]),t()})({0:function(e,a,t){e.exports=t("56d7")},"56d7":function(e,a,t){"use strict";t.r(a);t("cadf"),t("551c"),t("f751"),t("097d");var r=t("2b0e"),o=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{attrs:{id:"app"}},[t("router-view")],1)},s=[],i=t("2877"),n={},c=Object(i["a"])(n,o,s,!1,null,null,null),l=c.exports,d=t("8c4f"),u=function(){var e=this,a=e.$createElement,r=e._self._c||a;return r("div",{staticClass:"justify-content-center align-items-center"},[r("div",{staticClass:"d-flex flex-column align-items-center px-5 py-4 rounded bg-white bg-light"},[r("b-media",[r("img",{attrs:{src:t("cf05"),alt:"Logo de la empresa",width:"140px"}})]),r("h4",{staticClass:"px-sm-5 text-center text-sm-left"},[e._v("Inicio de sesión")]),r("div",{staticClass:"py-2 px-0 px-sm-5 my-2"},[r("b-form",{staticClass:"d-flex flex-column align-items-center my-3",on:{submit:function(a){return a.preventDefault(),e.login(a)}}},[r("b-form-group",[r("input",{directives:[{name:"model",rawName:"v-model",value:e.correo,expression:"correo"}],staticClass:"form-control",attrs:{type:"email",id:"correo",placeholder:"Ingresar email",required:""},domProps:{value:e.correo},on:{input:function(a){a.target.composing||(e.correo=a.target.value)}}})]),r("b-form-group",[r("input",{directives:[{name:"model",rawName:"v-model",value:e.contrasena,expression:"contrasena"}],staticClass:"form-control",attrs:{type:"password",id:"contrasena",placeholder:"Ingresar contraseña",required:""},domProps:{value:e.contrasena},on:{input:function(a){a.target.composing||(e.contrasena=a.target.value)}}})]),!0===e.error?r("div",[r("div",{staticClass:"alert alert-danger"},[e._v("Usuario y/o contraseña no encontrado")])]):e._e(),r("b-button",{staticClass:"btn btn-primary",attrs:{type:"submit",variant:"primary"}},[e._v("Iniciar sesión")])],1)],1)],1)])},p=[],m=t("bc3a"),f=t.n(m),v={name:"Login",data:function(){return{baseUrl:"https://salud-ocupacional-back.herokuapp.com",correo:"",contrasena:"",error:{}}},methods:{login:function(){var e=this;f()({method:"POST",url:this.baseUrl+"/login",data:{correo:this.correo,contrasena:this.contrasena},withCredentials:!0}).then((function(a){a.data.error?e.error=a.data.error:(localStorage.setItem("usertoken",a.data),e.error=a.data.error,e.correo="",e.contrasena="",e.$router.push("/home"))})).catch((function(e){console.log(e)}))}}},b=v,h=Object(i["a"])(b,u,p,!1,null,null,null),g=h.exports,x=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",[t("Header"),t("Container",[t("div",{staticClass:"col px-1 px-sm-5"},[t("b-form",{attrs:{id:"form-paso1"},on:{submit:function(a){return a.preventDefault(),e.camposVacios(a)}}},[t("div",{directives:[{name:"show",rawName:"v-show",value:!e.ocultar,expression:"!ocultar"}],attrs:{id:"#vista1"}},[t("Stepper",{attrs:{paso:"1"}}),null!==e.error?t("div",{class:[!0===e.error?"alert-danger":"alert-success","alert"]},[e._v(e._s(e.mensajeTransaccion))]):e._e(),t("h4",{staticClass:"px-sm-5 text-center text-sm-left"},[e._v(e._s(e.modoEdicion?"Edición":"Registro")+" de trabajador")]),t("div",{staticClass:"py-2 px-0 px-sm-5 my-2"},[t("div",{staticClass:"form-group"},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.nombres,expression:"nombres"}],staticClass:"form-control",attrs:{type:"text",pattern:"[A-Za-z_á_é_í_ó_ú_ñ_Á_É_Í_Ó_Ú_ ]{3,}",id:"nombres",placeholder:"Nombres",required:""},domProps:{value:e.nombres},on:{input:function(a){a.target.composing||(e.nombres=a.target.value)}}})]),t("div",{staticClass:"form-group"},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.apellidos,expression:"apellidos"}],staticClass:"form-control",attrs:{type:"text",pattern:"[A-Za-z_á_é_í_ó_ú_ñ_Á_É_Í_Ó_Ú_ ]{3,}",id:"apellidos",placeholder:"Apellidos",required:""},domProps:{value:e.apellidos},on:{input:function(a){a.target.composing||(e.apellidos=a.target.value)}}})]),t("div",{staticClass:"form-group"},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.direccion,expression:"direccion"}],staticClass:"form-control",attrs:{type:"text",id:"direccion",placeholder:"Dirección actual",required:""},domProps:{value:e.direccion},on:{input:function(a){a.target.composing||(e.direccion=a.target.value)}}})]),t("div",{staticClass:"form-group"},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.correo,expression:"correo"}],staticClass:"form-control",attrs:{type:"email",id:"correo",placeholder:"Correo",required:""},domProps:{value:e.correo},on:{input:function(a){a.target.composing||(e.correo=a.target.value)}}})]),t("div",{staticClass:"form-group"},[t("b-form-select",{attrs:{options:e.opcionesTipoDoc,required:""},model:{value:e.tipoDocumento,callback:function(a){e.tipoDocumento=a},expression:"tipoDocumento"}})],1),t("div",{staticClass:"form-group"},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.documento,expression:"documento"}],staticClass:"form-control",attrs:{type:"text",id:"documento",placeholder:"Documento",required:""},domProps:{value:e.documento},on:{input:function(a){a.target.composing||(e.documento=a.target.value)}}})]),t("div",{staticClass:"form-group"},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.telefono,expression:"telefono"}],staticClass:"form-control",attrs:{type:"text",id:"telefono",placeholder:"Teléfono",required:""},domProps:{value:e.telefono},on:{input:function(a){a.target.composing||(e.telefono=a.target.value)}}})]),t("div",{staticClass:"form-group"},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.celular,expression:"celular"}],staticClass:"form-control",attrs:{type:"text",id:"celular",placeholder:"Celular"},domProps:{value:e.celular},on:{input:function(a){a.target.composing||(e.celular=a.target.value)}}})]),t("div",{staticClass:"form-group"},[t("b-form-select",{attrs:{options:e.opcionesRiesgo,required:""},model:{value:e.nivelRiesgo,callback:function(a){e.nivelRiesgo=a},expression:"nivelRiesgo"}})],1),t("div",{staticClass:"form-group"},[t("label",{attrs:{for:"nacimiento"}},[e._v("Fecha de nacimiento")]),t("input",{directives:[{name:"model",rawName:"v-model",value:e.fechaNacimiento,expression:"fechaNacimiento"}],staticClass:"form-control",attrs:{type:"date",id:"nacimiento",min:"1939-01-01",max:"2000-12-29",required:""},domProps:{value:e.fechaNacimiento},on:{input:function(a){a.target.composing||(e.fechaNacimiento=a.target.value)}}})]),t("div",{staticClass:"form-group text-left"},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.telefonoFamiliar,expression:"telefonoFamiliar"}],staticClass:"form-control",attrs:{type:"text",id:"telefonoFamiliar",placeholder:"Teléfono de un familiar",required:""},domProps:{value:e.telefonoFamiliar},on:{input:function(a){a.target.composing||(e.telefonoFamiliar=a.target.value)}}})]),t("div",{staticClass:"form-check"},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.tipoTrabajador,expression:"tipoTrabajador"}],staticClass:"form-check-input",attrs:{type:"checkbox",value:"tipoTrabajador",id:"tipoTrabajador"},domProps:{checked:Array.isArray(e.tipoTrabajador)?e._i(e.tipoTrabajador,"tipoTrabajador")>-1:e.tipoTrabajador},on:{change:function(a){var t=e.tipoTrabajador,r=a.target,o=!!r.checked;if(Array.isArray(t)){var s="tipoTrabajador",i=e._i(t,s);r.checked?i<0&&(e.tipoTrabajador=t.concat([s])):i>-1&&(e.tipoTrabajador=t.slice(0,i).concat(t.slice(i+1)))}else e.tipoTrabajador=o}}}),t("label",{staticClass:"form-check-label",attrs:{for:"tipoTrabajador"}},[e._v("¿El trabajador se desempeña en el área de salud y seguridad en el trabajo?")])]),e.mostrarCamposVacios?t("div",[t("div",{staticClass:"alert alert-danger"},[e._v("Campos vacios")])]):e._e()]),t("b-button",{staticClass:"float-right mr-sm-5",attrs:{type:"submit",variant:"primary"}},[e._v("Siguiente")])],1)]),t("b-form",{on:{submit:function(a){return a.preventDefault(),e.registrarTrabajador(a)}}},[t("div",{directives:[{name:"show",rawName:"v-show",value:e.ocultar,expression:"ocultar"}],attrs:{id:"#vista2"}},[t("Stepper",{attrs:{paso:"2"}}),t("h4",{staticClass:"px-sm-5 pb-2 text-center text-sm-left"},[e._v("Listado de vacunas")]),t("div",{staticClass:"flex-grow-1 overflow-auto py-2 px-0 px-sm-5 my-2"},[t("b-form-group",e._l(e.listaVacunas,(function(a){return t("b-form-checkbox-group",{key:a._id,attrs:{id:"checkbox-group-2",name:"seleccionarVacunas"},model:{value:e.detallesVacunacion,callback:function(a){e.detallesVacunacion=a},expression:"detallesVacunacion"}},[t("b-form-checkbox",{attrs:{value:a._id}},[e._v(e._s(a.nombre))])],1)})),1)],1)],1),t("b-button",{directives:[{name:"show",rawName:"v-show",value:e.ocultar,expression:"ocultar"}],staticClass:"float-left ml-sm-5",attrs:{variant:"primary"},on:{click:function(a){e.ocultar=!e.ocultar}}},[e._v("Atras")]),e.ocultar?t("b-button",{staticClass:"float-right mr-sm-5",attrs:{type:"submit",variant:"primary"}},[e._v(e._s(e.modoEdicion?"Editar":"Registrar"))]):e._e()],1)],1)]),t("Footer")],1)},_=[],y=function(){var e=this,a=e.$createElement,r=e._self._c||a;return r("header",[r("b-navbar",{staticClass:"fixed-top bg-white",attrs:{toggleable:"lg"}},[r("b-navbar-brand",{attrs:{to:"/home"}},[r("img",{attrs:{src:t("cf05"),height:"30",alt:"Logo"}}),e._v("\n      Salud ocupacional\n    ")]),r("b-navbar-toggle",{attrs:{target:"nav-collapse"}}),r("b-collapse",{attrs:{id:"nav-collapse","is-nav":""}},[r("b-navbar-nav",{staticClass:"ml-auto",attrs:{pills:""}},[r("b-nav-item",{attrs:{to:"/trabajadores",exact:"","exact-active-class":"active"}},[r("i",{staticClass:"fas fa-users"}),e._v("\n          Ver trabajadores\n        ")]),r("b-nav-item",{attrs:{to:"/vacunas/registrar",exact:"","exact-active-class":"active"}},[r("i",{staticClass:"fas fa-medkit"}),e._v("\n          Registrar vacunas\n        ")]),r("b-nav-item",{attrs:{to:"/",exact:"","exact-active-class":"active"},on:{click:e.logout}},[r("i",{staticClass:"fas fa-sign-out-alt"}),e._v("\n          Cerrar sesión\n        ")])],1)],1)],1)],1)},C=[],j={name:"Header",data:function(){return{baseUrl:"https://salud-ocupacional-back.herokuapp.com"}},methods:{logout:function(){f.a.delete(this.baseUrl+"/login").then((function(e){e.data.error||localStorage.removeItem("usertoken")}))}}},w=j,k=Object(i["a"])(w,y,C,!1,null,null,null),T=k.exports,P=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("main",{staticClass:"d-flex justify-content-center pt-5",attrs:{id:"containerPrincipal"}},[t("div",{staticClass:"row container bg-white px-2 py-4 my-4 rounded shadow"},[e._t("default")],2)])},V=[],N={name:"Container"},E=N,S=Object(i["a"])(E,P,V,!1,null,null,null),O=S.exports,F=function(){var e=this,a=e.$createElement;e._self._c;return e._m(0)},A=[function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("footer",{staticClass:"bg-white"},[t("div",{staticClass:"text-center py-2"},[e._v("\n    Requisistemas • Medellín - Colombia • (034) 4446958 • Support (+57) 3174959841\n  ")]),t("div",{staticClass:"text-center pb-2"},[e._v("\n    Privacy Policy | Terms of Use | ® 2019 Requisistemas\n  ")])])}],D={name:"Footer"},R=D,I=Object(i["a"])(R,F,A,!1,null,null,null),q=I.exports,H=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"d-flex justify-content-center align-items-center pb-3 stepper"},[t("span",{class:[1==e.paso?"border-primary text-primary":"","rounded-circle border stepper-item"]},[t("i",{staticClass:"fas fa-user-plus"})]),t("span",{},[e._v("-------------")]),t("span",{class:[2==e.paso?"border-primary text-primary":"","rounded-circle border stepper-item"]},[t("i",{staticClass:"fas fa-medkit"})])])},U=[],$={name:"Stepper",props:["paso"]},L=$,M=(t("bebf"),Object(i["a"])(L,H,U,!1,null,null,null)),B=M.exports,z={name:"RegistrarTrabajador",components:{Header:T,Container:O,Footer:q,Stepper:B},data:function(){return{baseUrl:"https://salud-ocupacional-back.herokuapp.com",modoEdicion:!!this.$route.params.idTrabajador,nombres:"",apellidos:"",direccion:"",correo:"",tipoDocumento:null,documento:"",telefono:"",celular:null,nivelRiesgo:null,fechaNacimiento:"",telefonoFamiliar:"",tipoTrabajador:"",detallesVacunacion:[],error:null,mensajeTransaccion:"",ocultar:!1,mostrarCamposVacios:!1,listaVacunas:[],opcionesRiesgo:[{value:null,text:"Seleccionar nivel de riesgo"},{value:"I",text:"I"},{value:"II",text:"II"},{value:"III",text:"III"},{value:"IV",text:"IV"},{value:"V",text:"V"}],opcionesTipoDoc:[{value:null,text:"Seleccionar tipo de documento"},{value:"cc",text:"Cédula de ciudadanía"},{value:"tp",text:"Pasaporte"}]}},methods:{registrarTrabajador:function(){var e=this;this.error=null,this.mensajeTransaccion="",f()({method:"POST",url:this.baseUrl+"/empleados",data:{nombres:this.nombres,apellidos:this.apellidos,direccion:this.direccion,correo:this.correo,tipoDocumento:this.tipoDocumento,documento:this.documento,telefono:this.telefono,celular:this.celular,nivelRiesgo:this.nivelRiesgo,fechaNacimiento:this.fechaNacimiento,telefonoFamiliar:this.telefonoFamiliar,tipoTrabajador:this.tipoTrabajador,detallesVacunacion:this.detallesVacunacion},withCredentials:!0}).then((function(a){e.error=a.data.error,e.mensajeTransaccion=a.data.mensaje})).catch((function(e){console.log(e)})),this.nombres="",this.apellidos="",this.direccion="",this.correo="",this.tipoDocumento=null,this.documento="",this.telefono="",this.celular=null,this.nivelRiesgo=null,this.fechaNacimiento="",this.telefonoFamiliar="",this.tipoTrabajador="",this.detallesVacunacion=[],this.ocultar=!this.ocultar,this.mostrarCamposVacios=!1},camposVacios:function(){[this.nombres,this.apellidos,this.direccion,this.correo,this.tipoDocumento,this.documento,this.telefono,this.nivelRiesgo,this.fechaNacimiento,this.telefonoFamiliar].some((function(e){return""===e}))?this.mostrarCamposVacios=!0:this.ocultar=!this.ocultar}},created:function(){var e=this;f()({method:"GET",url:this.baseUrl+"/vacunas",withCredentials:!0}).then((function(a){e.listaVacunas=a.data.datos}))}},G=z,J=Object(i["a"])(G,x,_,!1,null,null,null),Z=J.exports,K=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",[t("Header"),t("Container",[t("div",{staticClass:"col d-flex flex-column justify-content-between py-2 px-1 px-sm-5 m-09"},[t("h4",{staticClass:"px-sm-5 text-center text-sm-left"},[e._v("Registro de vacunas")]),t("div",{staticClass:"flex-grow-1 overflow-auto py-2 px-0 px-sm-5 my-2"},[t("b-form",{on:{submit:function(a){return a.preventDefault(),e.registrarVacuna(a)}}},[t("b-form-group",[t("b-form-input",{attrs:{type:"text",id:"nombre-vacuna",placeholder:"Nombre",required:""},model:{value:e.nombre,callback:function(a){e.nombre=a},expression:"nombre"}})],1),t("div",{staticClass:"form-group row"},[t("div",{staticClass:"col-sm-11"},[t("b-form-input",{attrs:{type:"number",min:"0",id:"cantidad-aplicacion",placeholder:"Cantidad de veces a aplicar",required:""},model:{value:e.cantidadAplicar,callback:function(a){e.cantidadAplicar=a},expression:"cantidadAplicar"}})],1),t("label",{staticClass:"col-sm-1 col-form-label"},[e._v("Veces")])]),t("div",{staticClass:"form-group row"},[t("div",{staticClass:"col-sm-11"},[t("b-form-input",{attrs:{type:"number",min:"0",id:"periodicidad",placeholder:"Periodicidad"},model:{value:e.periodicidad,callback:function(a){e.periodicidad=a},expression:"periodicidad"}})],1),t("label",{staticClass:"col-sm-1 col-form-label"},[e._v("Días")])]),t("b-form-group",[t("b-form-input",{attrs:{type:"text",id:"entidad-prestadora",placeholder:"Entidad que brinda el servicio"},model:{value:e.prestadorServicio,callback:function(a){e.prestadorServicio=a},expression:"prestadorServicio"}})],1),t("b-form-group",[t("b-form-textarea",{attrs:{id:"descripcion",placeholder:"Descripción",rows:"3"},model:{value:e.descripcion,callback:function(a){e.descripcion=a},expression:"descripcion"}})],1),!1===e.error.error?t("div",[t("div",{staticClass:"alert alert-success"},[e._v(e._s(e.error.mensaje))])]):!0===e.error.error?t("div",[t("div",{staticClass:"alert alert-danger"},[e._v(e._s(e.error.mensaje))])]):e._e(),t("b-button",{staticClass:"float-right",attrs:{type:"submit",variant:"primary"}},[e._v("Registrar")])],1)],1)])]),t("Footer")],1)},Q=[],W={name:"RegistrarVacuna",components:{Header:T,Container:O,Footer:q},data:function(){return{baseUrl:"https://salud-ocupacional-back.herokuapp.com",nombre:"",descripcion:"",periodicidad:"",cantidadAplicar:"",prestadorServicio:"",error:{}}},methods:{registrarVacuna:function(){var e=this;f.a.post(this.baseUrl+"/vacunas",{nombre:this.nombre,descripcion:this.descripcion,periodicidad:this.periodicidad,cantidadAplicar:this.cantidadAplicar,prestadorServicio:this.prestadorServicio}).then((function(a){e.error=a.data,console.log(a.data)})).catch((function(e){console.log(e)})),this.nombre="",this.descripcion="",this.periodicidad="",this.cantidadAplicar="",this.prestadorServicio=""}}},X=W,Y=Object(i["a"])(X,K,Q,!1,null,null,null),ee=Y.exports,ae=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",[t("Header"),t("Container",[t("div",{staticClass:"w-100 d-flex flex-column align-items-center p-3"},[t("div",{staticClass:"w-100"},[t("b-button",{staticClass:"my-3 float-left",attrs:{to:"trabajadores/registrar",variant:"primary"}},[e._v("\n          Registrar Trabajador\n        ")]),t("div",{staticClass:"my-3 float-right"},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.filtro,expression:"filtro"}],staticClass:"form-control",attrs:{type:"text",placeholder:"Buscar","aria-label":"Buscar"},domProps:{value:e.filtro},on:{input:function(a){a.target.composing||(e.filtro=a.target.value)}}})])],1),t("b-table",{staticClass:"align-self-stretch shadow border text-center",attrs:{items:e.empleados,fields:e.camposEmpleados,filter:e.filtro,"per-page":e.perPage,"current-page":e.currentPage,"sort-by":e.sortBy,"sort-icon-center":""},on:{"update:sortBy":function(a){e.sortBy=a},"update:sort-by":function(a){e.sortBy=a}},scopedSlots:e._u([{key:"cell(ver)",fn:function(a){return[t("span",{domProps:{innerHTML:e._s(a.value)}})]}},{key:"cell(editar)",fn:function(a){return[t("span",{domProps:{innerHTML:e._s(a.value)}})]}},{key:"cell(eliminar)",fn:function(a){return[t("span",{domProps:{innerHTML:e._s(a.value)}})]}}])}),t("div",[t("b-pagination",{staticClass:"mt-4",attrs:{"total-rows":e.rows,"per-page":e.perPage},scopedSlots:e._u([{key:"first-text",fn:function(){return[t("span",{staticClass:"text-success"},[e._v("Primero")])]},proxy:!0},{key:"prev-text",fn:function(){return[t("span",{staticClass:"text-danger"},[e._v("Atras")])]},proxy:!0},{key:"next-text",fn:function(){return[t("span",{staticClass:"text-warning"},[e._v("Siguiente")])]},proxy:!0},{key:"last-text",fn:function(){return[t("span",{staticClass:"text-info"},[e._v("Ultimo")])]},proxy:!0},{key:"ellipsis-text",fn:function(){return[t("b-spinner",{attrs:{small:"",type:"grow"}}),t("b-spinner",{attrs:{small:"",type:"grow"}}),t("b-spinner",{attrs:{small:"",type:"grow"}})]},proxy:!0},{key:"page",fn:function(a){var r=a.page,o=a.active;return[t(o?"b":"i",[e._v(e._s(r))])]}}]),model:{value:e.currentPage,callback:function(a){e.currentPage=a},expression:"currentPage"}})],1)],1)]),t("Footer")],1)},te=[],re=(t("ac6a"),t("456d"),{name:"Trabajadores",components:{Header:T,Container:O,Footer:q},data:function(){return{baseUrl:"https://salud-ocupacional-back.herokuapp.com",filtro:"",camposEmpleados:[{key:"nombres",sortable:!0},{key:"identificacion",sortable:!1},{key:"ver",sortable:!1},{key:"editar",sortable:!1},{key:"eliminar",sortable:!1}],empleados:[],rows:1,perPage:50,currentPage:1,sortBy:"nombres"}},created:function(){this.obtenerEmpleados()},methods:{obtenerEmpleados:function(){var e=this;f()({method:"GET",url:this.baseUrl+"/empleados",withCredentials:!0}).then((function(a){e.empleados=a.data.datos,e.rows=Object.keys(e.empleados).length;for(var t=0;t<Object.keys(e.empleados).length;t++){var r=e.empleados[t]._id;e.empleados[t]["ver"]='<a href= "trabajadores/ver/'+r+'" class="btn btn-info"> <i class="fas fa-user"></i></a>',e.empleados[t]["editar"]='<a  href="" class="btn btn-success"><i class="fas fa-user-edit"></i></a>',e.empleados[t]["eliminar"]='<a  href="" class="btn btn-danger"><i class="fas fa-trash-alt"></i></a>'}}))}}}),oe=re,se=Object(i["a"])(oe,ae,te,!1,null,null,null),ie=se.exports,ne=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",[t("Header"),t("Container",[t("div",{staticClass:"w-100 d-flex flex-column align-items-center p-3"},[t("div",{staticClass:"w-100"},[t("h4",{staticClass:"p-2"},[e._v(e._s(this.trabajador.nombres)+" "+e._s(this.trabajador.apellidos))]),t("b-table-simple",{staticClass:"rounded shadow",attrs:{stacked:""}},[t("b-tbody",[t("b-tr",{staticClass:"text-center"},[t("b-td",{attrs:{"stacked-heading":"Tipo de identificación:"}},[e._v(e._s(this.trabajador.tipoIdentificacion))]),t("b-td",{attrs:{"stacked-heading":"Identificación:"}},[e._v(e._s(this.trabajador.identificacion))]),t("b-td",{attrs:{"stacked-heading":"Correo:"}},[e._v(e._s(this.trabajador.correo))]),t("b-td",{attrs:{"stacked-heading":"Fecha de nacimiento:"}},[e._v(e._s(String(this.trabajador.fechaNacimiento).substring(0,10)))]),t("b-td",{attrs:{"stacked-heading":"Dirección:"}},[e._v(e._s(this.trabajador.direccion))]),t("b-td",{attrs:{"stacked-heading":"Teléfono:"}},[e._v(e._s(this.trabajador.telefono))]),t("b-td",{attrs:{"stacked-heading":"Celular:"}},[e._v(e._s(this.trabajador.celular))]),t("b-td",{attrs:{"stacked-heading":"Contacto de allegado:"}},[e._v(e._s(this.trabajador.contactoAllegado))]),t("b-td",{attrs:{"stacked-heading":"Nivel de riesgo laboral:"}},[e._v(e._s(this.trabajador.nivelRiesgoLaboral))]),t("b-td",{attrs:{"stacked-heading":"Área de trabajo:"}},[e._v(e._s(this.trabajador.areaTrabajo))])],1)],1)],1),t("h4",{staticClass:"p-2"},[e._v("Vacunas")]),t("div",{staticClass:"overflow-auto"},[t("b-table",{staticClass:"align-self-stretch shadow border text-center",attrs:{id:"my-table",items:e.vacunas,fields:e.camposVacunas,"per-page":e.perPage,"current-page":e.currentPage,small:""}}),t("b-pagination",{attrs:{"total-rows":e.rows,"per-page":e.perPage,"aria-controls":"my-table",align:"right"},model:{value:e.currentPage,callback:function(a){e.currentPage=a},expression:"currentPage"}})],1)],1)])]),t("Footer")],1)},ce=[],le={name:"VerTrabajador",components:{Header:T,Container:O,Footer:q},data:function(){return{baseUrl:"https://salud-ocupacional-back.herokuapp.com",idTrabajador:this.$route.params.idTrabajador,trabajador:{},camposVacunas:[{key:"nombre",sortable:!0},{key:"cantidadAplicada",sortable:!1},{key:"proximaFechaDeAplicacion",sortable:!1}],vacunas:[],perPage:10,currentPage:1}},computed:{rows:function(){return this.vacunas.length}},created:function(){this.obtenerDatosEmpleado()},methods:{obtenerDatosEmpleado:function(){var e=this;f.a.get(this.baseUrl+"/empleados/"+this.idTrabajador).then((function(a){e.trabajador=a.data.datos,null==e.trabajador.celular&&(e.trabajador.celular="N/A");var t=[];e.trabajador.detallesVacunacion.forEach((function(e){t.push({nombre:e.vacuna.nombre,cantidadAplicada:e.cantidadAplicada+" de "+e.vacuna.cantidadAplicar,proximaFechaDeAplicacion:0})})),e.vacunas=t}))}}},de=le,ue=Object(i["a"])(de,ne,ce,!1,null,null,null),pe=ue.exports,me=function(){var e=this,a=e.$createElement,r=e._self._c||a;return r("div",[r("Header"),r("div",{staticClass:"align-self-center d-flex align-items-center justify-content-center rounded-circle bg-white shadow",attrs:{id:"logo"}},[r("b-media",[r("img",{attrs:{src:t("cf05"),alt:"Logo de la empresa",width:"140px"}})])],1),r("Footer")],1)},fe=[],ve={name:"Home",components:{Header:T,Footer:q}},be=ve,he=(t("cccb"),Object(i["a"])(be,me,fe,!1,null,null,null)),ge=he.exports;r["default"].use(d["a"]);var xe=new d["a"]({mode:"history",base:"/",routes:[{path:"/",name:"Login",component:g},{path:"/vacunas/registrar",name:"RegistrarVacuna",component:ee},{path:"/trabajadores/registrar",name:"RegistrarTrabajador",component:Z},{path:"/trabajadores/editar/:idTrabajador",name:"EditarTrabajador",component:Z},{path:"/trabajadores",name:"Trabajadores",component:ie},{path:"/trabajadores/ver/:idTrabajador",name:"VerTrabajador",component:pe},{path:"/home",name:"Home",component:ge}]}),_e=t("5f5b");t("d8bb");r["default"].use(_e["a"]),r["default"].config.productionTip=!1,new r["default"]({router:xe,render:function(e){return e(l)}}).$mount("#app")},bebf:function(e,a,t){"use strict";var r=t("f428"),o=t.n(r);o.a},cccb:function(e,a,t){"use strict";var r=t("d563"),o=t.n(r);o.a},cf05:function(e,a,t){e.exports=t.p+"img/logo.dbf5414c.png"},d563:function(e,a,t){},d8bb:function(e,a,t){},f428:function(e,a,t){}});
//# sourceMappingURL=app.6faa583f.js.map