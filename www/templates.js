(function (global) {
  var templates = {};
  var env = null;

  (function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["base.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
output += "<!DOCTYPE html>\n<html lang=\"ru\" data-bs-theme=\"dark\">\n<head>\n    <meta charset=\"UTF-8\">\n    <title>";
(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : context.getBlock("title"))(env, context, frame, runtime, function(t_2,t_1) {
if(t_2) { cb(t_2); return; }
output += t_1;
output += "</title>\n</head>\n<body>\n    <nav class=\"navbar navbar-expand bg-body-tertiary border-bottom sticky-top px-3\">\n        <a class=\"navbar-brand fw-bold d-flex align-items-center gap-2 me-4\" href=\"#/\">\n            <span class=\"d-inline-flex align-items-center justify-content-center bg-primary text-white rounded-3 p-2\">\n                <i class=\"bi bi-box-seam\"></i>\n            </span>\n            <span>Складской учёт</span>\n        </a>\n\n        <ul class=\"navbar-nav me-auto\">\n            <li class=\"nav-item\"><a class=\"nav-link\" data-nav=\"home\" href=\"#/\"><i class=\"bi bi-speedometer2 me-1\"></i>Обзор</a></li>\n            <li class=\"nav-item\"><a class=\"nav-link\" data-nav=\"products\" href=\"#/products\"><i class=\"bi bi-box-seam me-1\"></i>Товары</a></li>\n            <li class=\"nav-item\"><a class=\"nav-link\" data-nav=\"movements\" href=\"#/movements\"><i class=\"bi bi-arrow-left-right me-1\"></i>Движения</a></li>\n            <li class=\"nav-item\"><a class=\"nav-link\" data-nav=\"documents\" href=\"#/documents\"><i class=\"bi bi-file-earmark-text me-1\"></i>Документы</a></li>\n            <li class=\"nav-item\"><a class=\"nav-link\" data-nav=\"directories\" href=\"#/directories\"><i class=\"bi bi-bookshelf me-1\"></i>Справочники</a></li>\n        </ul>\n\n        <div class=\"d-flex align-items-center gap-2\">\n            <span id=\"operatorLabel\" class=\"small text-body-secondary\"></span>\n            <button type=\"button\" class=\"btn btn-outline-secondary border-0\"\n                    id=\"themeToggle\" aria-label=\"Переключить тему\">\n                <i class=\"bi bi-moon-stars\" id=\"themeIcon\"></i>\n            </button>\n            <a class=\"btn btn-outline-secondary btn-sm\" href=\"#/settings\" title=\"Настройки\">\n                <i class=\"bi bi-gear\"></i>\n            </a>\n        </div>\n    </nav>\n\n    <main class=\"container-fluid px-3 px-lg-4 py-3 app-main\">\n        ";
(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : context.getBlock("content"))(env, context, frame, runtime, function(t_4,t_3) {
if(t_4) { cb(t_4); return; }
output += t_3;
output += "\n    </main>\n\n    <!-- Контейнер уведомлений интерфейса (нативные Bootstrap Toast) -->\n    <div id=\"toastHost\" class=\"toast-container position-fixed top-0 end-0 p-3\"></div>\n\n    <!-- Модальное окно подтверждения PIN-кодом (для подписи документов) -->\n    <div class=\"modal\" id=\"pinModal\" tabindex=\"-1\" aria-hidden=\"true\">\n        <div class=\"modal-dialog modal-dialog-centered\">\n            <div class=\"modal-content rounded-4\">\n                <div class=\"modal-header\">\n                    <h6 class=\"modal-title\"><i class=\"bi bi-shield-lock me-2\"></i>Подтверждение оператора</h6>\n                    <button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"modal\"></button>\n                </div>\n                <div class=\"modal-body\">\n                    <label class=\"form-label\" for=\"pinInput\">PIN-код оператора</label>\n                    <input type=\"password\" class=\"form-control\" id=\"pinInput\" inputmode=\"numeric\" autocomplete=\"off\">\n                    <div class=\"text-danger small mt-2 d-none\" id=\"pinError\">Неверный PIN-код</div>\n                </div>\n                <div class=\"modal-footer\">\n                    <button type=\"button\" class=\"btn btn-outline-secondary\" data-bs-dismiss=\"modal\">Отмена</button>\n                    <button type=\"button\" class=\"btn btn-primary\" id=\"pinSubmit\">Подтвердить</button>\n                </div>\n            </div>\n        </div>\n    </div>\n</body>\n</html>\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
})});
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
function b_title(env, context, frame, runtime, cb) {
var lineno = 4;
var colno = 14;
var output = "";
try {
var frame = frame.push(true);
output += "Складской учёт";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
function b_content(env, context, frame, runtime, cb) {
var lineno = 36;
var colno = 11;
var output = "";
try {
var frame = frame.push(true);
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
b_title: b_title,
b_content: b_content,
root: root
};

})();
})();

(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["directories.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
env.getTemplate("base.html", true, "directories.html", false, function(t_3,t_2) {
if(t_3) { cb(t_3); return; }
parentTemplate = t_2
for(var t_1 in parentTemplate.blocks) {
context.addBlock(t_1, parentTemplate.blocks[t_1]);
}
output += "\n";
(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : context.getBlock("title"))(env, context, frame, runtime, function(t_5,t_4) {
if(t_5) { cb(t_5); return; }
output += t_4;
output += "\n\n";
(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : context.getBlock("content"))(env, context, frame, runtime, function(t_7,t_6) {
if(t_7) { cb(t_7); return; }
output += t_6;
output += "\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
})})});
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
function b_title(env, context, frame, runtime, cb) {
var lineno = 1;
var colno = 3;
var output = "";
try {
var frame = frame.push(true);
output += "Справочники";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
function b_content(env, context, frame, runtime, cb) {
var lineno = 3;
var colno = 3;
var output = "";
try {
var frame = frame.push(true);
output += "\n<div class=\"d-flex align-items-center justify-content-between mb-3\">\n    <h4 class=\"mb-0\"><i class=\"bi bi-bookshelf me-2\"></i>Справочники</h4>\n</div>\n\n<ul class=\"nav nav-tabs mb-3\" role=\"tablist\">\n    <li class=\"nav-item\">\n        <button class=\"nav-link active\" data-bs-toggle=\"tab\" data-bs-target=\"#tabCounterparties\" type=\"button\">\n            Контрагенты <span class=\"badge text-bg-secondary\">";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "counterparties")),"length"), env.opts.autoescape);
output += "</span>\n        </button>\n    </li>\n    <li class=\"nav-item\">\n        <button class=\"nav-link\" data-bs-toggle=\"tab\" data-bs-target=\"#tabCategories\" type=\"button\">\n            Категории <span class=\"badge text-bg-secondary\">";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "categories")),"length"), env.opts.autoescape);
output += "</span>\n        </button>\n    </li>\n    <li class=\"nav-item\">\n        <button class=\"nav-link\" data-bs-toggle=\"tab\" data-bs-target=\"#tabUnits\" type=\"button\">\n            Единицы измерения <span class=\"badge text-bg-secondary\">";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "units")),"length"), env.opts.autoescape);
output += "</span>\n        </button>\n    </li>\n</ul>\n\n<div class=\"tab-content\">\n    <!-- Контрагенты -->\n    <div class=\"tab-pane fade show active\" id=\"tabCounterparties\">\n        <div class=\"card shadow-sm\">\n            <div class=\"card-header bg-transparent d-flex justify-content-between align-items-center\">\n                <span>Контрагенты (поставщики и покупатели)</span>\n                <button class=\"btn btn-sm btn-primary\" id=\"addCounterparty\">\n                    <i class=\"bi bi-plus-lg me-1\"></i>Добавить\n                </button>\n            </div>\n            <div class=\"table-responsive\">\n                <table class=\"table table-hover align-middle mb-0\">\n                    <thead>\n                        <tr>\n                            <th>Наименование</th>\n                            <th>Тип</th>\n                            <th>ИНН</th>\n                            <th>Телефон</th>\n                            <th>Email</th>\n                            <th>Адрес</th>\n                            <th class=\"text-end text-nowrap\">Действия</th>\n                        </tr>\n                    </thead>\n                    <tbody id=\"counterpartiesBody\">\n                        ";
frame = frame.push();
var t_10 = runtime.contextOrFrameLookup(context, frame, "counterparties");
if(t_10) {t_10 = runtime.fromIterator(t_10);
var t_9 = t_10.length;
for(var t_8=0; t_8 < t_10.length; t_8++) {
var t_11 = t_10[t_8];
frame.set("c", t_11);
frame.set("loop.index", t_8 + 1);
frame.set("loop.index0", t_8);
frame.set("loop.revindex", t_9 - t_8);
frame.set("loop.revindex0", t_9 - t_8 - 1);
frame.set("loop.first", t_8 === 0);
frame.set("loop.last", t_8 === t_9 - 1);
frame.set("loop.length", t_9);
output += "\n                        <tr>\n                            <td class=\"fw-semibold\">";
output += runtime.suppressValue(runtime.memberLookup((t_11),"name"), env.opts.autoescape);
output += "</td>\n                            <td>\n                                <span class=\"badge text-bg-";
output += runtime.suppressValue((runtime.memberLookup((t_11),"type") == "supplier"?"success":"primary"), env.opts.autoescape);
output += "\">\n                                    ";
output += runtime.suppressValue((runtime.memberLookup((t_11),"type") == "supplier"?"поставщик":"покупатель"), env.opts.autoescape);
output += "\n                                </span>\n                            </td>\n                            <td class=\"small\">";
output += runtime.suppressValue(runtime.memberLookup((t_11),"inn") || "—", env.opts.autoescape);
output += "</td>\n                            <td class=\"small\">";
output += runtime.suppressValue(runtime.memberLookup((t_11),"phone") || "—", env.opts.autoescape);
output += "</td>\n                            <td class=\"small\">";
output += runtime.suppressValue(runtime.memberLookup((t_11),"email") || "—", env.opts.autoescape);
output += "</td>\n                            <td class=\"small text-body-secondary\">";
output += runtime.suppressValue(runtime.memberLookup((t_11),"address") || "—", env.opts.autoescape);
output += "</td>\n                            <td class=\"text-end text-nowrap\">\n                                <button class=\"btn btn-sm btn-outline-secondary\" data-action=\"edit-counterparty\"\n                                        data-id=\"";
output += runtime.suppressValue(runtime.memberLookup((t_11),"id"), env.opts.autoescape);
output += "\" title=\"Редактировать\"><i class=\"bi bi-pencil\"></i></button>\n                                <button class=\"btn btn-sm btn-outline-danger\" data-action=\"delete-counterparty\"\n                                        data-id=\"";
output += runtime.suppressValue(runtime.memberLookup((t_11),"id"), env.opts.autoescape);
output += "\" data-name=\"";
output += runtime.suppressValue(runtime.memberLookup((t_11),"name"), env.opts.autoescape);
output += "\" title=\"Удалить\"><i class=\"bi bi-trash\"></i></button>\n                            </td>\n                        </tr>\n                        ";
;
}
}
if (!t_9) {
output += "\n                        <tr><td colspan=\"7\" class=\"text-center text-body-secondary py-4\">Контрагенты не заведены</td></tr>\n                        ";
}
frame = frame.pop();
output += "\n                    </tbody>\n                </table>\n            </div>\n        </div>\n    </div>\n\n    <!-- Категории -->\n    <div class=\"tab-pane fade\" id=\"tabCategories\">\n        <div class=\"card shadow-sm\">\n            <div class=\"card-header bg-transparent d-flex justify-content-between align-items-center\">\n                <span>Категории товаров (с вложенностью)</span>\n                <button class=\"btn btn-sm btn-primary\" id=\"addCategory\">\n                    <i class=\"bi bi-plus-lg me-1\"></i>Добавить\n                </button>\n            </div>\n            <div class=\"table-responsive\">\n                <table class=\"table table-hover align-middle mb-0\">\n                    <thead>\n                        <tr>\n                            <th>Наименование</th>\n                            <th>Родительская категория</th>\n                            <th>Описание</th>\n                            <th class=\"text-end\">Товаров</th>\n                            <th class=\"text-end text-nowrap\">Действия</th>\n                        </tr>\n                    </thead>\n                    <tbody id=\"categoriesBody\">\n                        ";
frame = frame.push();
var t_14 = runtime.contextOrFrameLookup(context, frame, "categories");
if(t_14) {t_14 = runtime.fromIterator(t_14);
var t_13 = t_14.length;
for(var t_12=0; t_12 < t_14.length; t_12++) {
var t_15 = t_14[t_12];
frame.set("c", t_15);
frame.set("loop.index", t_12 + 1);
frame.set("loop.index0", t_12);
frame.set("loop.revindex", t_13 - t_12);
frame.set("loop.revindex0", t_13 - t_12 - 1);
frame.set("loop.first", t_12 === 0);
frame.set("loop.last", t_12 === t_13 - 1);
frame.set("loop.length", t_13);
output += "\n                        <tr>\n                            <td class=\"fw-semibold\">";
output += runtime.suppressValue(runtime.memberLookup((t_15),"name"), env.opts.autoescape);
output += "</td>\n                            <td>";
output += runtime.suppressValue(runtime.memberLookup((t_15),"parent_name") || "—", env.opts.autoescape);
output += "</td>\n                            <td class=\"small text-body-secondary\">";
output += runtime.suppressValue(runtime.memberLookup((t_15),"description") || "—", env.opts.autoescape);
output += "</td>\n                            <td class=\"text-end\">";
output += runtime.suppressValue(runtime.memberLookup((t_15),"products_count"), env.opts.autoescape);
output += "</td>\n                            <td class=\"text-end text-nowrap\">\n                                <button class=\"btn btn-sm btn-outline-secondary\" data-action=\"edit-category\"\n                                        data-id=\"";
output += runtime.suppressValue(runtime.memberLookup((t_15),"id"), env.opts.autoescape);
output += "\" title=\"Редактировать\"><i class=\"bi bi-pencil\"></i></button>\n                                <button class=\"btn btn-sm btn-outline-danger\" data-action=\"delete-category\"\n                                        data-id=\"";
output += runtime.suppressValue(runtime.memberLookup((t_15),"id"), env.opts.autoescape);
output += "\" data-name=\"";
output += runtime.suppressValue(runtime.memberLookup((t_15),"name"), env.opts.autoescape);
output += "\" title=\"Удалить\"><i class=\"bi bi-trash\"></i></button>\n                            </td>\n                        </tr>\n                        ";
;
}
}
if (!t_13) {
output += "\n                        <tr><td colspan=\"5\" class=\"text-center text-body-secondary py-4\">Категории не заведены</td></tr>\n                        ";
}
frame = frame.pop();
output += "\n                    </tbody>\n                </table>\n            </div>\n        </div>\n    </div>\n\n    <!-- Единицы измерения -->\n    <div class=\"tab-pane fade\" id=\"tabUnits\">\n        <div class=\"card shadow-sm\">\n            <div class=\"card-header bg-transparent\">Единицы измерения</div>\n            <div class=\"card-body border-bottom\">\n                <form id=\"unitForm\" class=\"row g-2 align-items-end\">\n                    <div class=\"col-md-5\">\n                        <label class=\"form-label small text-body-secondary mb-0\" for=\"unitName\">Название</label>\n                        <input class=\"form-control\" id=\"unitName\" required placeholder=\"килограмм\">\n                    </div>\n                    <div class=\"col-md-4\">\n                        <label class=\"form-label small text-body-secondary mb-0\" for=\"unitShort\">Кратко</label>\n                        <input class=\"form-control\" id=\"unitShort\" required maxlength=\"10\" placeholder=\"кг\">\n                    </div>\n                    <div class=\"col-md-3\">\n                        <button class=\"btn btn-primary w-100\" type=\"submit\">\n                            <i class=\"bi bi-plus-lg me-1\"></i>Добавить единицу\n                        </button>\n                    </div>\n                </form>\n            </div>\n            <div class=\"table-responsive\">\n                <table class=\"table table-hover align-middle mb-0\">\n                    <thead>\n                        <tr>\n                            <th>Название</th>\n                            <th>Краткое</th>\n                            <th class=\"text-end\">Товаров</th>\n                            <th class=\"text-end text-nowrap\"></th>\n                        </tr>\n                    </thead>\n                    <tbody id=\"unitsBody\">\n                        ";
frame = frame.push();
var t_18 = runtime.contextOrFrameLookup(context, frame, "units");
if(t_18) {t_18 = runtime.fromIterator(t_18);
var t_17 = t_18.length;
for(var t_16=0; t_16 < t_18.length; t_16++) {
var t_19 = t_18[t_16];
frame.set("u", t_19);
frame.set("loop.index", t_16 + 1);
frame.set("loop.index0", t_16);
frame.set("loop.revindex", t_17 - t_16);
frame.set("loop.revindex0", t_17 - t_16 - 1);
frame.set("loop.first", t_16 === 0);
frame.set("loop.last", t_16 === t_17 - 1);
frame.set("loop.length", t_17);
output += "\n                        <tr>\n                            <td>";
output += runtime.suppressValue(runtime.memberLookup((t_19),"name"), env.opts.autoescape);
output += "</td>\n                            <td><span class=\"badge text-bg-secondary\">";
output += runtime.suppressValue(runtime.memberLookup((t_19),"short_name"), env.opts.autoescape);
output += "</span></td>\n                            <td class=\"text-end\">";
output += runtime.suppressValue(runtime.memberLookup((t_19),"products_count"), env.opts.autoescape);
output += "</td>\n                            <td class=\"text-end\">\n                                <button class=\"btn btn-sm btn-outline-danger\" data-action=\"delete-unit\"\n                                        data-id=\"";
output += runtime.suppressValue(runtime.memberLookup((t_19),"id"), env.opts.autoescape);
output += "\" data-name=\"";
output += runtime.suppressValue(runtime.memberLookup((t_19),"name"), env.opts.autoescape);
output += "\" title=\"Удалить\"><i class=\"bi bi-trash\"></i></button>\n                            </td>\n                        </tr>\n                        ";
;
}
}
if (!t_17) {
output += "\n                        <tr><td colspan=\"4\" class=\"text-center text-body-secondary py-4\">Единицы не заведены</td></tr>\n                        ";
}
frame = frame.pop();
output += "\n                    </tbody>\n                </table>\n            </div>\n        </div>\n    </div>\n</div>\n\n<!-- Модальное окно: контрагент -->\n<div class=\"modal\" id=\"counterpartyModal\" tabindex=\"-1\" aria-hidden=\"true\">\n    <div class=\"modal-dialog modal-lg modal-dialog-centered\">\n        <div class=\"modal-content rounded-4\">\n            <form id=\"counterpartyForm\">\n                <div class=\"modal-header\">\n                    <h6 class=\"modal-title\" id=\"counterpartyModalTitle\">Контрагент</h6>\n                    <button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"modal\"></button>\n                </div>\n                <div class=\"modal-body\">\n                    <input type=\"hidden\" id=\"cpId\">\n                    <div class=\"row g-3\">\n                        <div class=\"col-md-8\">\n                            <label class=\"form-label\" for=\"cpName\">Наименование *</label>\n                            <input class=\"form-control\" id=\"cpName\" required maxlength=\"200\">\n                        </div>\n                        <div class=\"col-md-4\">\n                            <label class=\"form-label\" for=\"cpType\">Тип *</label>\n                            <select class=\"form-select\" id=\"cpType\">\n                                <option value=\"supplier\">Поставщик</option>\n                                <option value=\"customer\">Покупатель</option>\n                            </select>\n                        </div>\n                        <div class=\"col-md-4\">\n                            <label class=\"form-label\" for=\"cpInn\">ИНН</label>\n                            <input class=\"form-control\" id=\"cpInn\" maxlength=\"20\">\n                        </div>\n                        <div class=\"col-md-4\">\n                            <label class=\"form-label\" for=\"cpPhone\">Телефон</label>\n                            <input class=\"form-control\" id=\"cpPhone\" maxlength=\"20\">\n                        </div>\n                        <div class=\"col-md-4\">\n                            <label class=\"form-label\" for=\"cpEmail\">Email</label>\n                            <input class=\"form-control\" id=\"cpEmail\" maxlength=\"100\" type=\"email\">\n                        </div>\n                        <div class=\"col-12\">\n                            <label class=\"form-label\" for=\"cpAddress\">Адрес</label>\n                            <textarea class=\"form-control\" id=\"cpAddress\" rows=\"2\"></textarea>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"modal-footer\">\n                    <button type=\"button\" class=\"btn btn-outline-secondary\" data-bs-dismiss=\"modal\">Отмена</button>\n                    <button type=\"submit\" class=\"btn btn-primary\">Сохранить</button>\n                </div>\n            </form>\n        </div>\n    </div>\n</div>\n\n<!-- Модальное окно: категория -->\n<div class=\"modal\" id=\"categoryModal\" tabindex=\"-1\" aria-hidden=\"true\">\n    <div class=\"modal-dialog modal-dialog-centered\">\n        <div class=\"modal-content rounded-4\">\n            <form id=\"categoryForm\">\n                <div class=\"modal-header\">\n                    <h6 class=\"modal-title\" id=\"categoryModalTitle\">Категория</h6>\n                    <button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"modal\"></button>\n                </div>\n                <div class=\"modal-body\">\n                    <input type=\"hidden\" id=\"catId\">\n                    <div class=\"row g-3\">\n                        <div class=\"col-12\">\n                            <label class=\"form-label\" for=\"catName\">Наименование *</label>\n                            <input class=\"form-control\" id=\"catName\" required maxlength=\"100\">\n                        </div>\n                        <div class=\"col-12\">\n                            <label class=\"form-label\" for=\"catParent\">Родительская категория</label>\n                            <select class=\"form-select\" id=\"catParent\">\n                                <option value=\"\">— корневая —</option>\n                                ";
frame = frame.push();
var t_22 = runtime.contextOrFrameLookup(context, frame, "categories");
if(t_22) {t_22 = runtime.fromIterator(t_22);
var t_21 = t_22.length;
for(var t_20=0; t_20 < t_22.length; t_20++) {
var t_23 = t_22[t_20];
frame.set("c", t_23);
frame.set("loop.index", t_20 + 1);
frame.set("loop.index0", t_20);
frame.set("loop.revindex", t_21 - t_20);
frame.set("loop.revindex0", t_21 - t_20 - 1);
frame.set("loop.first", t_20 === 0);
frame.set("loop.last", t_20 === t_21 - 1);
frame.set("loop.length", t_21);
output += "\n                                <option value=\"";
output += runtime.suppressValue(runtime.memberLookup((t_23),"id"), env.opts.autoescape);
output += "\">";
output += runtime.suppressValue(runtime.memberLookup((t_23),"name"), env.opts.autoescape);
output += "</option>\n                                ";
;
}
}
frame = frame.pop();
output += "\n                            </select>\n                        </div>\n                        <div class=\"col-12\">\n                            <label class=\"form-label\" for=\"catDescription\">Описание</label>\n                            <textarea class=\"form-control\" id=\"catDescription\" rows=\"2\"></textarea>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"modal-footer\">\n                    <button type=\"button\" class=\"btn btn-outline-secondary\" data-bs-dismiss=\"modal\">Отмена</button>\n                    <button type=\"submit\" class=\"btn btn-primary\">Сохранить</button>\n                </div>\n            </form>\n        </div>\n    </div>\n</div>\n";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
b_title: b_title,
b_content: b_content,
root: root
};

})();
})();

(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["documents.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
env.getTemplate("base.html", true, "documents.html", false, function(t_3,t_2) {
if(t_3) { cb(t_3); return; }
parentTemplate = t_2
for(var t_1 in parentTemplate.blocks) {
context.addBlock(t_1, parentTemplate.blocks[t_1]);
}
output += "\n";
(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : context.getBlock("title"))(env, context, frame, runtime, function(t_5,t_4) {
if(t_5) { cb(t_5); return; }
output += t_4;
output += "\n\n";
(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : context.getBlock("content"))(env, context, frame, runtime, function(t_7,t_6) {
if(t_7) { cb(t_7); return; }
output += t_6;
output += "\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
})})});
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
function b_title(env, context, frame, runtime, cb) {
var lineno = 1;
var colno = 3;
var output = "";
try {
var frame = frame.push(true);
output += "Документы";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
function b_content(env, context, frame, runtime, cb) {
var lineno = 3;
var colno = 3;
var output = "";
try {
var frame = frame.push(true);
output += "\n<div class=\"d-flex align-items-center justify-content-between mb-3 flex-wrap gap-2\">\n    <h4 class=\"mb-0\"><i class=\"bi bi-file-earmark-text me-2\"></i>Документы</h4>\n    <a class=\"btn btn-primary\" href=\"#/documents/new\"><i class=\"bi bi-plus-lg me-1\"></i>Оформить документ</a>\n</div>\n\n<div class=\"card shadow-sm mb-3\">\n    <div class=\"card-body py-2\">\n        <div class=\"row g-2 align-items-end\">\n            <div class=\"col-lg-3\">\n                <label class=\"form-label small text-body-secondary mb-0\" for=\"docTypeFilter\">Тип документа</label>\n                <select class=\"form-select\" id=\"docTypeFilter\">\n                    <option value=\"\">Все типы</option>\n                    <option value=\"incoming\" ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "filters")),"docType") == "incoming") {
output += "selected";
;
}
output += ">Приходная накладная</option>\n                    <option value=\"outgoing\" ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "filters")),"docType") == "outgoing") {
output += "selected";
;
}
output += ">Расходная накладная</option>\n                    <option value=\"write_off\" ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "filters")),"docType") == "write_off") {
output += "selected";
;
}
output += ">Акт списания</option>\n                    <option value=\"inventory\" ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "filters")),"docType") == "inventory") {
output += "selected";
;
}
output += ">Акт инвентаризации</option>\n                </select>\n            </div>\n\n            <div class=\"col-lg-5\">\n                <label class=\"form-label small text-body-secondary mb-0\">Отчёт по обороту за период</label>\n                <div class=\"input-group\">\n                    <input type=\"date\" class=\"form-control\" id=\"reportFrom\" value=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "period")),"from"), env.opts.autoescape);
output += "\">\n                    <input type=\"date\" class=\"form-control\" id=\"reportTo\" value=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "period")),"to"), env.opts.autoescape);
output += "\">\n                    <button class=\"btn btn-outline-primary\" type=\"button\" id=\"reportBtn\">\n                        <i class=\"bi bi-file-earmark-pdf me-1\"></i>PDF\n                    </button>\n                </div>\n            </div>\n\n            <div class=\"col-lg-4 text-lg-end small text-body-secondary\">\n                PDF формируется в приложении и сохраняется через системный диалог сохранения\n            </div>\n        </div>\n    </div>\n</div>\n\n<div class=\"card shadow-sm\">\n    <div class=\"table-responsive\">\n        <table class=\"table table-hover align-middle mb-0\">\n            <thead>\n                <tr>\n                    <th>Номер</th>\n                    <th>Тип</th>\n                    <th>Дата</th>\n                    <th>Контрагент</th>\n                    <th>Ответственный</th>\n                    <th class=\"text-end\">Позиций</th>\n                    <th>PDF</th>\n                    <th class=\"text-end text-nowrap\">Действия</th>\n                </tr>\n            </thead>\n            <tbody id=\"documentsBody\">\n                <tr><td colspan=\"8\" class=\"text-center text-body-secondary py-4\">Загрузка…</td></tr>\n            </tbody>\n        </table>\n    </div>\n    <div class=\"card-footer bg-transparent small text-body-secondary\" id=\"documentsCount\"></div>\n</div>\n";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
b_title: b_title,
b_content: b_content,
root: root
};

})();
})();

(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["document_detail.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
env.getTemplate("base.html", true, "document_detail.html", false, function(t_3,t_2) {
if(t_3) { cb(t_3); return; }
parentTemplate = t_2
for(var t_1 in parentTemplate.blocks) {
context.addBlock(t_1, parentTemplate.blocks[t_1]);
}
output += "\n";
(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : context.getBlock("title"))(env, context, frame, runtime, function(t_5,t_4) {
if(t_5) { cb(t_5); return; }
output += t_4;
output += "\n\n";
(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : context.getBlock("content"))(env, context, frame, runtime, function(t_7,t_6) {
if(t_7) { cb(t_7); return; }
output += t_6;
output += "\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
})})});
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
function b_title(env, context, frame, runtime, cb) {
var lineno = 1;
var colno = 3;
var output = "";
try {
var frame = frame.push(true);
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "document")),"number"), env.opts.autoescape);
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
function b_content(env, context, frame, runtime, cb) {
var lineno = 3;
var colno = 3;
var output = "";
try {
var frame = frame.push(true);
output += "\n<div class=\"d-flex align-items-center justify-content-between mb-3 flex-wrap gap-2\">\n    <h4 class=\"mb-0\">\n        <a class=\"text-body-secondary text-decoration-none me-2\" href=\"#/documents\"><i class=\"bi bi-arrow-left\"></i></a>\n        ";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "document")),"number"), env.opts.autoescape);
output += "\n        <span class=\"badge text-bg-";
output += runtime.suppressValue(runtime.memberLookup(({"incoming": "success","outgoing": "primary","write_off": "danger","inventory": "secondary"}),runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "document")),"doc_type")) || "secondary", env.opts.autoescape);
output += " ms-2\">\n            ";
output += runtime.suppressValue(runtime.memberLookup(({"incoming": "Приходная накладная","outgoing": "Расходная накладная","write_off": "Акт списания","inventory": "Акт инвентаризации"}),runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "document")),"doc_type")) || runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "document")),"doc_type"), env.opts.autoescape);
output += "\n        </span>\n    </h4>\n    <div class=\"btn-group\">\n        <button type=\"button\" class=\"btn btn-primary\" id=\"makePdfBtn\">\n            <i class=\"bi bi-file-earmark-pdf me-1\"></i>";
output += runtime.suppressValue((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "document")),"pdf_path")?"Пересформировать PDF":"Сформировать PDF"), env.opts.autoescape);
output += "\n        </button>\n        <button type=\"button\" class=\"btn btn-outline-primary ";
if(!runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "document")),"pdf_path")) {
output += "d-none";
;
}
output += "\" id=\"openPdfBtn\">\n            <i class=\"bi bi-box-arrow-up-right me-1\"></i>Открыть PDF\n        </button>\n    </div>\n</div>\n\n<div class=\"row g-3\">\n    <div class=\"col-lg-4\">\n        <div class=\"card shadow-sm\">\n            <div class=\"card-header bg-transparent\">Реквизиты</div>\n            <div class=\"card-body\">\n                <dl class=\"row mb-0\">\n                    <dt class=\"col-5 text-body-secondary\">Дата</dt>\n                    <dd class=\"col-7\">";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "document")),"doc_date"), env.opts.autoescape);
output += "</dd>\n\n                    <dt class=\"col-5 text-body-secondary\">Контрагент</dt>\n                    <dd class=\"col-7\">";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "document")),"counterparty_name") || "—", env.opts.autoescape);
output += "</dd>\n\n                    <dt class=\"col-5 text-body-secondary\">Ответственный</dt>\n                    <dd class=\"col-7\">";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "document")),"responsible") || "—", env.opts.autoescape);
output += "</dd>\n\n                    <dt class=\"col-5 text-body-secondary\">Создан</dt>\n                    <dd class=\"col-7 small\">";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "document")),"created_at"), env.opts.autoescape);
output += "</dd>\n\n                    <dt class=\"col-5 text-body-secondary\">PDF</dt>\n                    <dd class=\"col-7 small text-break\">";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "document")),"pdf_path") || "не сформирован", env.opts.autoescape);
output += "</dd>\n                </dl>\n                ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "document")),"comment")) {
output += "\n                <hr>\n                <div class=\"small text-body-secondary\">Комментарий</div>\n                <div>";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "document")),"comment"), env.opts.autoescape);
output += "</div>\n                ";
;
}
output += "\n            </div>\n        </div>\n    </div>\n\n    <div class=\"col-lg-8\">\n        <div class=\"card shadow-sm\">\n            <div class=\"card-header bg-transparent\">\n                ";
output += runtime.suppressValue((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "document")),"doc_type") == "inventory"?"Позиции (по текущим остаткам)":"Позиции документа"), env.opts.autoescape);
output += "\n            </div>\n            <div class=\"table-responsive\">\n                <table class=\"table table-hover align-middle mb-0\">\n                    <thead>\n                        <tr>\n                            <th>Артикул</th>\n                            <th>Наименование</th>\n                            <th>Операция</th>\n                            <th class=\"text-end\">Кол-во</th>\n                            <th class=\"text-end\">Цена</th>\n                            <th class=\"text-end\">Сумма</th>\n                        </tr>\n                    </thead>\n                    <tbody>\n                    ";
frame = frame.push();
var t_10 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "document")),"items");
if(t_10) {t_10 = runtime.fromIterator(t_10);
var t_9 = t_10.length;
for(var t_8=0; t_8 < t_10.length; t_8++) {
var t_11 = t_10[t_8];
frame.set("item", t_11);
frame.set("loop.index", t_8 + 1);
frame.set("loop.index0", t_8);
frame.set("loop.revindex", t_9 - t_8);
frame.set("loop.revindex0", t_9 - t_8 - 1);
frame.set("loop.first", t_8 === 0);
frame.set("loop.last", t_8 === t_9 - 1);
frame.set("loop.length", t_9);
output += "\n                        <tr>\n                            <td><a href=\"#/products/";
output += runtime.suppressValue(runtime.memberLookup((t_11),"product_id"), env.opts.autoescape);
output += "\" class=\"text-decoration-none\">";
output += runtime.suppressValue(runtime.memberLookup((t_11),"article"), env.opts.autoescape);
output += "</a></td>\n                            <td>";
output += runtime.suppressValue(runtime.memberLookup((t_11),"name"), env.opts.autoescape);
output += "</td>\n                            <td>\n                                <span class=\"badge text-bg-";
output += runtime.suppressValue((runtime.memberLookup((t_11),"movement_type") == "in"?"success":((runtime.memberLookup((t_11),"movement_type") == "out"?"warning":"danger"))), env.opts.autoescape);
output += "\">\n                                    ";
output += runtime.suppressValue(runtime.memberLookup(({"in": "Приход","out": "Расход","write_off": "Списание"}),runtime.memberLookup((t_11),"movement_type")) || runtime.memberLookup((t_11),"movement_type"), env.opts.autoescape);
output += "\n                                </span>\n                            </td>\n                            <td class=\"text-end fw-semibold\">";
output += runtime.suppressValue(runtime.memberLookup((t_11),"quantity"), env.opts.autoescape);
output += " ";
output += runtime.suppressValue(runtime.memberLookup((t_11),"unit_short") || "", env.opts.autoescape);
output += "</td>\n                            <td class=\"text-end\">";
output += runtime.suppressValue(env.getFilter("round").call(context, runtime.memberLookup((t_11),"price_at_moment"),2), env.opts.autoescape);
output += "</td>\n                            <td class=\"text-end\">";
output += runtime.suppressValue(env.getFilter("round").call(context, runtime.memberLookup((t_11),"sum"),2), env.opts.autoescape);
output += "</td>\n                        </tr>\n                    ";
;
}
}
if (!t_9) {
output += "\n                        <tr>\n                            <td colspan=\"6\" class=\"text-center text-body-secondary py-4\">\n                                ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "document")),"doc_type") == "inventory") {
output += "\n                                Позиции определяются текущими остатками склада\n                                ";
;
}
else {
output += "\n                                Позиции отсутствуют\n                                ";
;
}
output += "\n                            </td>\n                        </tr>\n                    ";
}
frame = frame.pop();
output += "\n                    </tbody>\n                    ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "document")),"items")) {
output += "\n                    <tfoot>\n                        <tr>\n                            <th colspan=\"5\" class=\"text-end\">Итого:</th>\n                            <th class=\"text-end\">";
output += runtime.suppressValue(env.getFilter("round").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "document")),"total"),2), env.opts.autoescape);
output += "</th>\n                        </tr>\n                    </tfoot>\n                    ";
;
}
output += "\n                </table>\n            </div>\n        </div>\n    </div>\n</div>\n";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
b_title: b_title,
b_content: b_content,
root: root
};

})();
})();

(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["document_form.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
env.getTemplate("base.html", true, "document_form.html", false, function(t_3,t_2) {
if(t_3) { cb(t_3); return; }
parentTemplate = t_2
for(var t_1 in parentTemplate.blocks) {
context.addBlock(t_1, parentTemplate.blocks[t_1]);
}
output += "\n";
(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : context.getBlock("title"))(env, context, frame, runtime, function(t_5,t_4) {
if(t_5) { cb(t_5); return; }
output += t_4;
output += "\n\n";
(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : context.getBlock("content"))(env, context, frame, runtime, function(t_7,t_6) {
if(t_7) { cb(t_7); return; }
output += t_6;
output += "\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
})})});
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
function b_title(env, context, frame, runtime, cb) {
var lineno = 1;
var colno = 3;
var output = "";
try {
var frame = frame.push(true);
output += "Новый документ";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
function b_content(env, context, frame, runtime, cb) {
var lineno = 3;
var colno = 3;
var output = "";
try {
var frame = frame.push(true);
output += "\n<div class=\"d-flex align-items-center justify-content-between mb-3\">\n    <h4 class=\"mb-0\">\n        <a class=\"text-body-secondary text-decoration-none me-2\" href=\"#/documents\"><i class=\"bi bi-arrow-left\"></i></a>\n        Оформление документа\n    </h4>\n</div>\n\n<form id=\"documentForm\" class=\"card shadow-sm\">\n    <div class=\"card-body\">\n        <div class=\"row g-3 mb-3\">\n            <div class=\"col-md-3\">\n                <label class=\"form-label\" for=\"docType\">Тип документа *</label>\n                <select class=\"form-select\" id=\"docType\" name=\"doc_type\" required>\n                    <option value=\"incoming\">Приходная накладная</option>\n                    <option value=\"outgoing\">Расходная накладная</option>\n                    <option value=\"write_off\">Акт списания</option>\n                    <option value=\"inventory\">Акт инвентаризации</option>\n                </select>\n            </div>\n            <div class=\"col-md-3\">\n                <label class=\"form-label\" for=\"docDate\">Дата документа *</label>\n                <input type=\"date\" class=\"form-control\" id=\"docDate\" name=\"doc_date\" required value=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "today"), env.opts.autoescape);
output += "\">\n            </div>\n            <div class=\"col-md-3\">\n                <label class=\"form-label\" for=\"counterparty\">Контрагент</label>\n                <select class=\"form-select\" id=\"counterparty\" name=\"counterparty_id\">\n                    <option value=\"\">— не выбран —</option>\n                    ";
frame = frame.push();
var t_10 = runtime.contextOrFrameLookup(context, frame, "counterparties");
if(t_10) {t_10 = runtime.fromIterator(t_10);
var t_9 = t_10.length;
for(var t_8=0; t_8 < t_10.length; t_8++) {
var t_11 = t_10[t_8];
frame.set("c", t_11);
frame.set("loop.index", t_8 + 1);
frame.set("loop.index0", t_8);
frame.set("loop.revindex", t_9 - t_8);
frame.set("loop.revindex0", t_9 - t_8 - 1);
frame.set("loop.first", t_8 === 0);
frame.set("loop.last", t_8 === t_9 - 1);
frame.set("loop.length", t_9);
output += "\n                    <option value=\"";
output += runtime.suppressValue(runtime.memberLookup((t_11),"id"), env.opts.autoescape);
output += "\" data-type=\"";
output += runtime.suppressValue(runtime.memberLookup((t_11),"type"), env.opts.autoescape);
output += "\">";
output += runtime.suppressValue(runtime.memberLookup((t_11),"name"), env.opts.autoescape);
output += "\n                        (";
output += runtime.suppressValue((runtime.memberLookup((t_11),"type") == "supplier"?"поставщик":"покупатель"), env.opts.autoescape);
output += ")\n                    </option>\n                    ";
;
}
}
frame = frame.pop();
output += "\n                </select>\n                <div class=\"form-text\" id=\"counterpartyHint\"></div>\n            </div>\n            <div class=\"col-md-3\">\n                <label class=\"form-label\" for=\"responsible\">Ответственный</label>\n                <input type=\"text\" class=\"form-control\" id=\"responsible\" name=\"responsible\"\n                       value=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "operator"), env.opts.autoescape);
output += "\" placeholder=\"ФИО оператора\">\n            </div>\n            <div class=\"col-12\">\n                <label class=\"form-label\" for=\"docComment\">Комментарий</label>\n                <textarea class=\"form-control\" id=\"docComment\" name=\"comment\" rows=\"2\"></textarea>\n            </div>\n        </div>\n\n        <div id=\"itemsSection\">\n            <div class=\"d-flex align-items-center justify-content-between mb-2\">\n                <h6 class=\"mb-0\">Позиции документа</h6>\n                <button type=\"button\" class=\"btn btn-sm btn-outline-primary\" id=\"addItem\">\n                    <i class=\"bi bi-plus-lg me-1\"></i>Добавить позицию\n                </button>\n            </div>\n\n            <div class=\"table-responsive\">\n                <table class=\"table align-middle mb-0\">\n                    <thead>\n                        <tr>\n                            <th>Товар</th>\n                            <th class=\"text-end text-nowrap\">Количество</th>\n                            <th class=\"text-end text-nowrap\">Цена, руб.</th>\n                            <th class=\"text-end text-nowrap\">Сумма</th>\n                            <th></th>\n                        </tr>\n                    </thead>\n                    <tbody id=\"itemsBody\"></tbody>\n                    <tfoot>\n                        <tr>\n                            <th colspan=\"3\" class=\"text-end\">Итого:</th>\n                            <th class=\"text-end\" id=\"itemsTotal\">0.00</th>\n                            <th></th>\n                        </tr>\n                    </tfoot>\n                </table>\n            </div>\n        </div>\n\n        <div class=\"alert alert-secondary d-none mt-3\" id=\"inventoryNote\">\n            <i class=\"bi bi-info-circle me-1\"></i>\n            Акт инвентаризации фиксирует текущие остатки склада: позиции не добавляются вручную,\n            документ печатается по данным на момент формирования.\n        </div>\n\n        <div class=\"alert alert-danger d-none mt-3\" id=\"formError\"></div>\n    </div>\n\n    <div class=\"card-footer bg-transparent d-flex justify-content-end gap-2\">\n        <a class=\"btn btn-outline-secondary\" href=\"#/documents\">Отмена</a>\n        <button type=\"submit\" class=\"btn btn-primary\">\n            <i class=\"bi bi-check-lg me-1\"></i>Провести документ\n        </button>\n    </div>\n</form>\n";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
b_title: b_title,
b_content: b_content,
root: root
};

})();
})();

(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["home.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
env.getTemplate("base.html", true, "home.html", false, function(t_3,t_2) {
if(t_3) { cb(t_3); return; }
parentTemplate = t_2
for(var t_1 in parentTemplate.blocks) {
context.addBlock(t_1, parentTemplate.blocks[t_1]);
}
output += "\n";
(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : context.getBlock("title"))(env, context, frame, runtime, function(t_5,t_4) {
if(t_5) { cb(t_5); return; }
output += t_4;
output += "\n\n";
(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : context.getBlock("content"))(env, context, frame, runtime, function(t_7,t_6) {
if(t_7) { cb(t_7); return; }
output += t_6;
output += "\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
})})});
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
function b_title(env, context, frame, runtime, cb) {
var lineno = 1;
var colno = 3;
var output = "";
try {
var frame = frame.push(true);
output += "Обзор склада";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
function b_content(env, context, frame, runtime, cb) {
var lineno = 3;
var colno = 3;
var output = "";
try {
var frame = frame.push(true);
output += "\n<div class=\"d-flex align-items-center justify-content-between mb-3 flex-wrap gap-2\">\n    <h4 class=\"mb-0\"><i class=\"bi bi-speedometer2 me-2\"></i>Обзор склада</h4>\n    <div class=\"btn-group\">\n        <a class=\"btn btn-primary\" href=\"#/products/new\"><i class=\"bi bi-plus-lg me-1\"></i>Добавить товар</a>\n        <a class=\"btn btn-outline-primary\" href=\"#/documents/new\"><i class=\"bi bi-file-earmark-plus me-1\"></i>Оформить документ</a>\n    </div>\n</div>\n\n<div class=\"row g-3 mb-3\">\n    <div class=\"col-sm-6 col-xl-3\">\n        <div class=\"card h-100 shadow-sm\">\n            <div class=\"card-body\">\n                <div class=\"text-body-secondary small\">Товаров на складе</div>\n                <div class=\"fs-3 fw-semibold\">";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "stats")),"productsActive"), env.opts.autoescape);
output += "</div>\n                <div class=\"small text-body-secondary\">всего записей: ";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "stats")),"productsTotal"), env.opts.autoescape);
output += "</div>\n            </div>\n        </div>\n    </div>\n    <div class=\"col-sm-6 col-xl-3\">\n        <div class=\"card h-100 shadow-sm ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "stats")),"lowStock") > 0) {
output += "border-danger";
;
}
output += "\">\n            <div class=\"card-body\">\n                <div class=\"text-body-secondary small\">Ниже минимума</div>\n                <div class=\"fs-3 fw-semibold ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "stats")),"lowStock") > 0) {
output += "text-danger";
;
}
output += "\">";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "stats")),"lowStock"), env.opts.autoescape);
output += "</div>\n                <div class=\"small text-body-secondary\">требуется дозаказ</div>\n            </div>\n        </div>\n    </div>\n    <div class=\"col-sm-6 col-xl-3\">\n        <div class=\"card h-100 shadow-sm\">\n            <div class=\"card-body\">\n                <div class=\"text-body-secondary small\">Документов за месяц</div>\n                <div class=\"fs-3 fw-semibold\">";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "stats")),"docsMonth"), env.opts.autoescape);
output += "</div>\n                <div class=\"small text-body-secondary\">приход / расход / списание</div>\n            </div>\n        </div>\n    </div>\n    <div class=\"col-sm-6 col-xl-3\">\n        <div class=\"card h-100 shadow-sm\">\n            <div class=\"card-body\">\n                <div class=\"text-body-secondary small\">Стоимость остатков</div>\n                <div class=\"fs-3 fw-semibold\">";
output += runtime.suppressValue(env.getFilter("round").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "stats")),"stockValue"),0), env.opts.autoescape);
output += "</div>\n                <div class=\"small text-body-secondary\">руб. по ценам учёта</div>\n            </div>\n        </div>\n    </div>\n</div>\n\n<div class=\"row g-3\">\n    <div class=\"col-lg-7\">\n        <div class=\"card shadow-sm h-100\">\n            <div class=\"card-header bg-transparent d-flex justify-content-between align-items-center\">\n                <span><i class=\"bi bi-exclamation-triangle text-danger me-2\"></i>Товары ниже минимума</span>\n                <a class=\"small\" href=\"#/products\">все товары</a>\n            </div>\n            <div class=\"table-responsive\">\n                <table class=\"table table-hover align-middle mb-0\">\n                    <thead>\n                        <tr>\n                            <th>Артикул</th>\n                            <th>Наименование</th>\n                            <th class=\"text-end\">Остаток</th>\n                            <th class=\"text-end\">Минимум</th>\n                            <th>Место</th>\n                        </tr>\n                    </thead>\n                    <tbody>\n                    ";
frame = frame.push();
var t_10 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "stats")),"lowList");
if(t_10) {t_10 = runtime.fromIterator(t_10);
var t_9 = t_10.length;
for(var t_8=0; t_8 < t_10.length; t_8++) {
var t_11 = t_10[t_8];
frame.set("p", t_11);
frame.set("loop.index", t_8 + 1);
frame.set("loop.index0", t_8);
frame.set("loop.revindex", t_9 - t_8);
frame.set("loop.revindex0", t_9 - t_8 - 1);
frame.set("loop.first", t_8 === 0);
frame.set("loop.last", t_8 === t_9 - 1);
frame.set("loop.length", t_9);
output += "\n                        <tr class=\"table-danger\">\n                            <td><a href=\"#/products/";
output += runtime.suppressValue(runtime.memberLookup((t_11),"id"), env.opts.autoescape);
output += "\">";
output += runtime.suppressValue(runtime.memberLookup((t_11),"article"), env.opts.autoescape);
output += "</a></td>\n                            <td>";
output += runtime.suppressValue(runtime.memberLookup((t_11),"name"), env.opts.autoescape);
output += "</td>\n                            <td class=\"text-end fw-semibold\">";
output += runtime.suppressValue(runtime.memberLookup((t_11),"current_stock"), env.opts.autoescape);
output += " ";
output += runtime.suppressValue(runtime.memberLookup((t_11),"unit_short") || "", env.opts.autoescape);
output += "</td>\n                            <td class=\"text-end\">";
output += runtime.suppressValue(runtime.memberLookup((t_11),"min_stock"), env.opts.autoescape);
output += "</td>\n                            <td class=\"text-body-secondary\">";
output += runtime.suppressValue(runtime.memberLookup((t_11),"location") || "—", env.opts.autoescape);
output += "</td>\n                        </tr>\n                    ";
;
}
}
if (!t_9) {
output += "\n                        <tr><td colspan=\"5\" class=\"text-center text-body-secondary py-4\">Все остатки в норме</td></tr>\n                    ";
}
frame = frame.pop();
output += "\n                    </tbody>\n                </table>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"col-lg-5\">\n        <div class=\"card shadow-sm h-100\">\n            <div class=\"card-header bg-transparent d-flex justify-content-between align-items-center\">\n                <span><i class=\"bi bi-clock-history me-2\"></i>Последние движения</span>\n                <a class=\"small\" href=\"#/movements\">журнал</a>\n            </div>\n            <ul class=\"list-group list-group-flush\">\n                ";
frame = frame.push();
var t_14 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "stats")),"recent");
if(t_14) {t_14 = runtime.fromIterator(t_14);
var t_13 = t_14.length;
for(var t_12=0; t_12 < t_14.length; t_12++) {
var t_15 = t_14[t_12];
frame.set("m", t_15);
frame.set("loop.index", t_12 + 1);
frame.set("loop.index0", t_12);
frame.set("loop.revindex", t_13 - t_12);
frame.set("loop.revindex0", t_13 - t_12 - 1);
frame.set("loop.first", t_12 === 0);
frame.set("loop.last", t_12 === t_13 - 1);
frame.set("loop.length", t_13);
output += "\n                <li class=\"list-group-item d-flex justify-content-between align-items-start gap-2\">\n                    <div>\n                        <div class=\"small fw-semibold\">";
output += runtime.suppressValue(runtime.memberLookup((t_15),"product_name"), env.opts.autoescape);
output += "</div>\n                        <div class=\"small text-body-secondary\">\n                            ";
output += runtime.suppressValue(runtime.memberLookup((t_15),"doc_number") || "—", env.opts.autoescape);
output += " · ";
output += runtime.suppressValue(env.getFilter("truncate").call(context, runtime.memberLookup((t_15),"created_at"),16,true,""), env.opts.autoescape);
output += "\n                        </div>\n                    </div>\n                    <span class=\"badge text-bg-";
output += runtime.suppressValue((runtime.memberLookup((t_15),"movement_type") == "in"?"success":"warning"), env.opts.autoescape);
output += "\">\n                        ";
if(runtime.memberLookup((t_15),"movement_type") == "in") {
output += "+";
;
}
else {
output += "-";
;
}
output += runtime.suppressValue(runtime.memberLookup((t_15),"quantity"), env.opts.autoescape);
output += " ";
output += runtime.suppressValue(runtime.memberLookup((t_15),"unit_short") || "", env.opts.autoescape);
output += "\n                    </span>\n                </li>\n                ";
;
}
}
if (!t_13) {
output += "\n                <li class=\"list-group-item text-center text-body-secondary py-4\">Движений пока нет</li>\n                ";
}
frame = frame.pop();
output += "\n            </ul>\n        </div>\n    </div>\n</div>\n";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
b_title: b_title,
b_content: b_content,
root: root
};

})();
})();

(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["movements.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
env.getTemplate("base.html", true, "movements.html", false, function(t_3,t_2) {
if(t_3) { cb(t_3); return; }
parentTemplate = t_2
for(var t_1 in parentTemplate.blocks) {
context.addBlock(t_1, parentTemplate.blocks[t_1]);
}
output += "\n";
(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : context.getBlock("title"))(env, context, frame, runtime, function(t_5,t_4) {
if(t_5) { cb(t_5); return; }
output += t_4;
output += "\n\n";
(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : context.getBlock("content"))(env, context, frame, runtime, function(t_7,t_6) {
if(t_7) { cb(t_7); return; }
output += t_6;
output += "\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
})})});
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
function b_title(env, context, frame, runtime, cb) {
var lineno = 1;
var colno = 3;
var output = "";
try {
var frame = frame.push(true);
output += "Журнал движений";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
function b_content(env, context, frame, runtime, cb) {
var lineno = 3;
var colno = 3;
var output = "";
try {
var frame = frame.push(true);
output += "\n<div class=\"d-flex align-items-center justify-content-between mb-3 flex-wrap gap-2\">\n    <h4 class=\"mb-0\"><i class=\"bi bi-arrow-left-right me-2\"></i>Журнал движений товара</h4>\n    <div class=\"small text-body-secondary\">каждый приход, расход и списание — с привязкой к документу</div>\n</div>\n\n<div class=\"card shadow-sm mb-3\">\n    <div class=\"card-body py-2\">\n        <div class=\"row g-2 align-items-end\">\n            <div class=\"col-lg-2\">\n                <label class=\"form-label small text-body-secondary mb-0\" for=\"dateFrom\">Дата с</label>\n                <input type=\"date\" class=\"form-control\" id=\"dateFrom\" value=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "filters")),"dateFrom"), env.opts.autoescape);
output += "\">\n            </div>\n            <div class=\"col-lg-2\">\n                <label class=\"form-label small text-body-secondary mb-0\" for=\"dateTo\">Дата по</label>\n                <input type=\"date\" class=\"form-control\" id=\"dateTo\" value=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "filters")),"dateTo"), env.opts.autoescape);
output += "\">\n            </div>\n            <div class=\"col-lg-3\">\n                <label class=\"form-label small text-body-secondary mb-0\" for=\"typeFilter\">Тип операции</label>\n                <select class=\"form-select\" id=\"typeFilter\">\n                    <option value=\"\">Все операции</option>\n                    <option value=\"in\" ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "filters")),"type") == "in") {
output += "selected";
;
}
output += ">Приход</option>\n                    <option value=\"out\" ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "filters")),"type") == "out") {
output += "selected";
;
}
output += ">Расход</option>\n                    <option value=\"write_off\" ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "filters")),"type") == "write_off") {
output += "selected";
;
}
output += ">Списание</option>\n                </select>\n            </div>\n            <div class=\"col-lg-3\">\n                <label class=\"form-label small text-body-secondary mb-0\" for=\"productFilter\">Товар</label>\n                <select class=\"form-select\" id=\"productFilter\">\n                    <option value=\"\">Все товары</option>\n                    ";
frame = frame.push();
var t_10 = runtime.contextOrFrameLookup(context, frame, "products");
if(t_10) {t_10 = runtime.fromIterator(t_10);
var t_9 = t_10.length;
for(var t_8=0; t_8 < t_10.length; t_8++) {
var t_11 = t_10[t_8];
frame.set("p", t_11);
frame.set("loop.index", t_8 + 1);
frame.set("loop.index0", t_8);
frame.set("loop.revindex", t_9 - t_8);
frame.set("loop.revindex0", t_9 - t_8 - 1);
frame.set("loop.first", t_8 === 0);
frame.set("loop.last", t_8 === t_9 - 1);
frame.set("loop.length", t_9);
output += "\n                    <option value=\"";
output += runtime.suppressValue(runtime.memberLookup((t_11),"id"), env.opts.autoescape);
output += "\" ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "filters")),"productId") == runtime.memberLookup((t_11),"id")) {
output += "selected";
;
}
output += ">\n                        ";
output += runtime.suppressValue(runtime.memberLookup((t_11),"name"), env.opts.autoescape);
output += " (";
output += runtime.suppressValue(runtime.memberLookup((t_11),"article"), env.opts.autoescape);
output += ")\n                    </option>\n                    ";
;
}
}
frame = frame.pop();
output += "\n                </select>\n            </div>\n            <div class=\"col-lg-2\">\n                <button type=\"button\" class=\"btn btn-outline-secondary w-100\" id=\"resetFilters\">\n                    <i class=\"bi bi-x-lg me-1\"></i>Сбросить\n                </button>\n            </div>\n        </div>\n    </div>\n</div>\n\n<div class=\"card shadow-sm\">\n    <div class=\"table-responsive\">\n        <table class=\"table table-hover align-middle mb-0\">\n            <thead>\n                <tr>\n                    <th>Дата и время</th>\n                    <th>Документ</th>\n                    <th>Товар</th>\n                    <th>Операция</th>\n                    <th class=\"text-end\">Кол-во</th>\n                    <th class=\"text-end\">Цена</th>\n                    <th class=\"text-end\">Сумма</th>\n                    <th>Комментарий</th>\n                </tr>\n            </thead>\n            <tbody id=\"movementsBody\">\n                <tr><td colspan=\"8\" class=\"text-center text-body-secondary py-4\">Загрузка…</td></tr>\n            </tbody>\n        </table>\n    </div>\n    <div class=\"card-footer bg-transparent d-flex justify-content-between small text-body-secondary\">\n        <span id=\"movementsCount\"></span>\n        <span id=\"movementsTotals\"></span>\n    </div>\n</div>\n";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
b_title: b_title,
b_content: b_content,
root: root
};

})();
})();

(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["partials/documents_tbody.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
frame = frame.push();
var t_3 = runtime.contextOrFrameLookup(context, frame, "documents");
if(t_3) {t_3 = runtime.fromIterator(t_3);
var t_2 = t_3.length;
for(var t_1=0; t_1 < t_3.length; t_1++) {
var t_4 = t_3[t_1];
frame.set("d", t_4);
frame.set("loop.index", t_1 + 1);
frame.set("loop.index0", t_1);
frame.set("loop.revindex", t_2 - t_1);
frame.set("loop.revindex0", t_2 - t_1 - 1);
frame.set("loop.first", t_1 === 0);
frame.set("loop.last", t_1 === t_2 - 1);
frame.set("loop.length", t_2);
output += "\n<tr>\n    <td>\n        <a href=\"#/documents/";
output += runtime.suppressValue(runtime.memberLookup((t_4),"id"), env.opts.autoescape);
output += "\" class=\"fw-semibold text-decoration-none\">";
output += runtime.suppressValue(runtime.memberLookup((t_4),"number"), env.opts.autoescape);
output += "</a>\n    </td>\n    <td>\n        <span class=\"badge text-bg-";
output += runtime.suppressValue(runtime.memberLookup(({"incoming": "success","outgoing": "primary","write_off": "danger","inventory": "secondary"}),runtime.memberLookup((t_4),"doc_type")) || "secondary", env.opts.autoescape);
output += "\">\n            ";
output += runtime.suppressValue(runtime.memberLookup(({"incoming": "Приход","outgoing": "Расход","write_off": "Списание","inventory": "Инвентаризация"}),runtime.memberLookup((t_4),"doc_type")) || runtime.memberLookup((t_4),"doc_type"), env.opts.autoescape);
output += "\n        </span>\n    </td>\n    <td class=\"text-nowrap\">";
output += runtime.suppressValue(runtime.memberLookup((t_4),"doc_date"), env.opts.autoescape);
output += "</td>\n    <td>";
output += runtime.suppressValue(runtime.memberLookup((t_4),"counterparty_name") || "—", env.opts.autoescape);
output += "</td>\n    <td class=\"small\">";
output += runtime.suppressValue(runtime.memberLookup((t_4),"responsible") || "—", env.opts.autoescape);
output += "</td>\n    <td class=\"text-end\">";
output += runtime.suppressValue((runtime.memberLookup((t_4),"doc_type") == "inventory"?"снимок":runtime.memberLookup((t_4),"items_count")), env.opts.autoescape);
output += "</td>\n    <td>\n        ";
if(runtime.memberLookup((t_4),"pdf_path")) {
output += "\n        <i class=\"bi bi-file-earmark-check text-success\" title=\"PDF сохранён\"></i>\n        <span class=\"small text-body-secondary ms-1\">есть</span>\n        ";
;
}
else {
output += "\n        <span class=\"small text-body-secondary\">не сформирован</span>\n        ";
;
}
output += "\n    </td>\n    <td class=\"text-end text-nowrap\">\n        <a class=\"btn btn-sm btn-outline-secondary\" href=\"#/documents/";
output += runtime.suppressValue(runtime.memberLookup((t_4),"id"), env.opts.autoescape);
output += "\" title=\"Открыть\">\n            <i class=\"bi bi-eye\"></i>\n        </a>\n        <button type=\"button\" class=\"btn btn-sm btn-outline-danger\" data-action=\"pdf\" data-id=\"";
output += runtime.suppressValue(runtime.memberLookup((t_4),"id"), env.opts.autoescape);
output += "\"\n                data-number=\"";
output += runtime.suppressValue(runtime.memberLookup((t_4),"number"), env.opts.autoescape);
output += "\" title=\"Сформировать PDF\">\n            <i class=\"bi bi-file-earmark-pdf\"></i>\n        </button>\n    </td>\n</tr>\n";
;
}
}
if (!t_2) {
output += "\n<tr><td colspan=\"8\" class=\"text-center text-body-secondary py-4\">Документов нет</td></tr>\n";
}
frame = frame.pop();
output += "\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();

(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["partials/document_item_row.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
output += "<tr data-item-row>\n    <td>\n        <select class=\"form-select form-select-sm productSelect\" required>\n            <option value=\"\">— выберите товар —</option>\n            ";
frame = frame.push();
var t_3 = runtime.contextOrFrameLookup(context, frame, "products");
if(t_3) {t_3 = runtime.fromIterator(t_3);
var t_2 = t_3.length;
for(var t_1=0; t_1 < t_3.length; t_1++) {
var t_4 = t_3[t_1];
frame.set("p", t_4);
frame.set("loop.index", t_1 + 1);
frame.set("loop.index0", t_1);
frame.set("loop.revindex", t_2 - t_1);
frame.set("loop.revindex0", t_2 - t_1 - 1);
frame.set("loop.first", t_1 === 0);
frame.set("loop.last", t_1 === t_2 - 1);
frame.set("loop.length", t_2);
output += "\n            <option value=\"";
output += runtime.suppressValue(runtime.memberLookup((t_4),"id"), env.opts.autoescape);
output += "\" data-price=\"";
output += runtime.suppressValue(runtime.memberLookup((t_4),"price"), env.opts.autoescape);
output += "\" data-stock=\"";
output += runtime.suppressValue(runtime.memberLookup((t_4),"current_stock"), env.opts.autoescape);
output += "\">\n                ";
output += runtime.suppressValue(runtime.memberLookup((t_4),"name"), env.opts.autoescape);
output += " (";
output += runtime.suppressValue(runtime.memberLookup((t_4),"article"), env.opts.autoescape);
output += ") · остаток ";
output += runtime.suppressValue(runtime.memberLookup((t_4),"current_stock"), env.opts.autoescape);
output += "\n            </option>\n            ";
;
}
}
frame = frame.pop();
output += "\n        </select>\n    </td>\n    <td>\n        <input type=\"number\" class=\"form-control form-control-sm text-end qtyInput\"\n               min=\"1\" step=\"1\" value=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "row")),"quantity") || 1, env.opts.autoescape);
output += "\" required>\n    </td>\n    <td>\n        <input type=\"number\" class=\"form-control form-control-sm text-end priceInput\"\n               min=\"0\" step=\"0.01\" value=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "row")),"price") || 0, env.opts.autoescape);
output += "\" required>\n    </td>\n    <td class=\"text-end sumCell\">0.00</td>\n    <td class=\"text-end\">\n        <button type=\"button\" class=\"btn btn-sm btn-outline-danger removeItem\" title=\"Удалить строку\">\n            <i class=\"bi bi-x-lg\"></i>\n        </button>\n    </td>\n</tr>\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();

(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["partials/movements_tbody.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
frame = frame.push();
var t_3 = runtime.contextOrFrameLookup(context, frame, "movements");
if(t_3) {t_3 = runtime.fromIterator(t_3);
var t_2 = t_3.length;
for(var t_1=0; t_1 < t_3.length; t_1++) {
var t_4 = t_3[t_1];
frame.set("m", t_4);
frame.set("loop.index", t_1 + 1);
frame.set("loop.index0", t_1);
frame.set("loop.revindex", t_2 - t_1);
frame.set("loop.revindex0", t_2 - t_1 - 1);
frame.set("loop.first", t_1 === 0);
frame.set("loop.last", t_1 === t_2 - 1);
frame.set("loop.length", t_2);
output += "\n<tr>\n    <td class=\"small text-nowrap\">";
output += runtime.suppressValue(env.getFilter("truncate").call(context, runtime.memberLookup((t_4),"created_at"),16,true,""), env.opts.autoescape);
output += "</td>\n    <td class=\"small\">\n        ";
if(runtime.memberLookup((t_4),"document_id")) {
output += "\n        <a href=\"#/documents/";
output += runtime.suppressValue(runtime.memberLookup((t_4),"document_id"), env.opts.autoescape);
output += "\" class=\"text-decoration-none\">\n            ";
output += runtime.suppressValue(runtime.memberLookup((t_4),"doc_number") || ("№" + "" + runtime.memberLookup((t_4),"document_id")), env.opts.autoescape);
output += "\n        </a>\n        ";
;
}
else {
output += "—";
;
}
output += "\n    </td>\n    <td>\n        <a href=\"#/products/";
output += runtime.suppressValue(runtime.memberLookup((t_4),"product_id"), env.opts.autoescape);
output += "\" class=\"text-decoration-none\">";
output += runtime.suppressValue(runtime.memberLookup((t_4),"product_name"), env.opts.autoescape);
output += "</a>\n        <div class=\"small text-body-secondary\">";
output += runtime.suppressValue(runtime.memberLookup((t_4),"article"), env.opts.autoescape);
output += "</div>\n    </td>\n    <td>\n        <span class=\"badge text-bg-";
output += runtime.suppressValue((runtime.memberLookup((t_4),"movement_type") == "in"?"success":((runtime.memberLookup((t_4),"movement_type") == "out"?"warning":"danger"))), env.opts.autoescape);
output += "\">\n            ";
output += runtime.suppressValue(runtime.memberLookup(({"in": "Приход","out": "Расход","write_off": "Списание"}),runtime.memberLookup((t_4),"movement_type")) || runtime.memberLookup((t_4),"movement_type"), env.opts.autoescape);
output += "\n        </span>\n    </td>\n    <td class=\"text-end fw-semibold\">\n        ";
if(runtime.memberLookup((t_4),"movement_type") == "in") {
output += "+";
;
}
else {
output += "-";
;
}
output += runtime.suppressValue(runtime.memberLookup((t_4),"quantity"), env.opts.autoescape);
output += " ";
output += runtime.suppressValue(runtime.memberLookup((t_4),"unit_short") || "", env.opts.autoescape);
output += "\n    </td>\n    <td class=\"text-end\">";
output += runtime.suppressValue(env.getFilter("round").call(context, runtime.memberLookup((t_4),"price_at_moment"),2), env.opts.autoescape);
output += "</td>\n    <td class=\"text-end\">";
output += runtime.suppressValue(env.getFilter("round").call(context, runtime.memberLookup((t_4),"sum"),2), env.opts.autoescape);
output += "</td>\n    <td class=\"small text-body-secondary\">";
output += runtime.suppressValue(runtime.memberLookup((t_4),"comment") || "", env.opts.autoescape);
output += "</td>\n</tr>\n";
;
}
}
if (!t_2) {
output += "\n<tr><td colspan=\"8\" class=\"text-center text-body-secondary py-4\">Движений по заданным фильтрам нет</td></tr>\n";
}
frame = frame.pop();
output += "\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();

(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["partials/products_tbody.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
frame = frame.push();
var t_3 = runtime.contextOrFrameLookup(context, frame, "products");
if(t_3) {t_3 = runtime.fromIterator(t_3);
var t_2 = t_3.length;
for(var t_1=0; t_1 < t_3.length; t_1++) {
var t_4 = t_3[t_1];
frame.set("p", t_4);
frame.set("loop.index", t_1 + 1);
frame.set("loop.index0", t_1);
frame.set("loop.revindex", t_2 - t_1);
frame.set("loop.revindex0", t_2 - t_1 - 1);
frame.set("loop.first", t_1 === 0);
frame.set("loop.last", t_1 === t_2 - 1);
frame.set("loop.length", t_2);
output += "\n<tr class=\"";
if(runtime.memberLookup((t_4),"is_low")) {
output += "table-danger";
;
}
if(!runtime.memberLookup((t_4),"is_active")) {
output += " opacity-50";
;
}
output += "\">\n    <td>\n        ";
if(runtime.memberLookup((t_4),"image_url")) {
output += "\n        <img src=\"";
output += runtime.suppressValue(runtime.memberLookup((t_4),"image_url"), env.opts.autoescape);
output += "\" alt=\"\" width=\"40\" height=\"40\"\n             class=\"rounded border object-fit-cover\">\n        ";
;
}
else {
output += "\n        <span class=\"d-inline-flex align-items-center justify-content-center bg-body-secondary rounded p-2\">\n            <i class=\"bi bi-image text-body-secondary\"></i>\n        </span>\n        ";
;
}
output += "\n    </td>\n    <td><a href=\"#/products/";
output += runtime.suppressValue(runtime.memberLookup((t_4),"id"), env.opts.autoescape);
output += "\" class=\"fw-semibold text-decoration-none\">";
output += runtime.suppressValue(runtime.memberLookup((t_4),"article"), env.opts.autoescape);
output += "</a></td>\n    <td>\n        ";
output += runtime.suppressValue(runtime.memberLookup((t_4),"name"), env.opts.autoescape);
output += "\n        ";
if(!runtime.memberLookup((t_4),"is_active")) {
output += "<span class=\"badge text-bg-secondary ms-1\">архив</span>";
;
}
output += "\n        ";
if(runtime.memberLookup((t_4),"is_low")) {
output += "<span class=\"badge text-bg-danger ms-1\">минимум</span>";
;
}
output += "\n        <div class=\"small text-body-secondary\">";
output += runtime.suppressValue(runtime.memberLookup((t_4),"unit_name") || "", env.opts.autoescape);
output += "</div>\n    </td>\n    <td>";
output += runtime.suppressValue(runtime.memberLookup((t_4),"category_name") || "—", env.opts.autoescape);
output += "</td>\n    <td class=\"text-end fw-semibold\">";
output += runtime.suppressValue(runtime.memberLookup((t_4),"current_stock"), env.opts.autoescape);
output += "</td>\n    <td class=\"text-end\">";
output += runtime.suppressValue(env.getFilter("round").call(context, runtime.memberLookup((t_4),"price"),2), env.opts.autoescape);
output += "</td>\n    <td class=\"small text-body-secondary\">";
output += runtime.suppressValue(runtime.memberLookup((t_4),"location") || "—", env.opts.autoescape);
output += "</td>\n    <td class=\"small text-body-secondary\">";
output += runtime.suppressValue(runtime.memberLookup((t_4),"receipt") || "—", env.opts.autoescape);
output += "</td>\n    <td class=\"text-end text-nowrap\">\n        <a class=\"btn btn-sm btn-outline-secondary\" href=\"#/products/";
output += runtime.suppressValue(runtime.memberLookup((t_4),"id"), env.opts.autoescape);
output += "/edit\" title=\"Редактировать\">\n            <i class=\"bi bi-pencil\"></i>\n        </a>\n        <button type=\"button\" class=\"btn btn-sm btn-outline-secondary\" data-action=\"archive\"\n                data-id=\"";
output += runtime.suppressValue(runtime.memberLookup((t_4),"id"), env.opts.autoescape);
output += "\" data-archived=\"";
output += runtime.suppressValue(runtime.memberLookup((t_4),"is_active"), env.opts.autoescape);
output += "\"\n                title=\"";
output += runtime.suppressValue((runtime.memberLookup((t_4),"is_active")?"В архив":"Вернуть из архива"), env.opts.autoescape);
output += "\">\n            <i class=\"bi ";
output += runtime.suppressValue((runtime.memberLookup((t_4),"is_active")?"bi-box-arrow-in-down":"bi-arrow-counterclockwise"), env.opts.autoescape);
output += "\"></i>\n        </button>\n        <button type=\"button\" class=\"btn btn-sm btn-outline-danger\" data-action=\"delete\"\n                data-id=\"";
output += runtime.suppressValue(runtime.memberLookup((t_4),"id"), env.opts.autoescape);
output += "\" data-name=\"";
output += runtime.suppressValue(runtime.memberLookup((t_4),"name"), env.opts.autoescape);
output += "\" title=\"Удалить\">\n            <i class=\"bi bi-trash\"></i>\n        </button>\n    </td>\n</tr>\n";
;
}
}
if (!t_2) {
output += "\n<tr><td colspan=\"9\" class=\"text-center text-body-secondary py-4\">Товары не найдены</td></tr>\n";
}
frame = frame.pop();
output += "\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();

(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["products.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
env.getTemplate("base.html", true, "products.html", false, function(t_3,t_2) {
if(t_3) { cb(t_3); return; }
parentTemplate = t_2
for(var t_1 in parentTemplate.blocks) {
context.addBlock(t_1, parentTemplate.blocks[t_1]);
}
output += "\n";
(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : context.getBlock("title"))(env, context, frame, runtime, function(t_5,t_4) {
if(t_5) { cb(t_5); return; }
output += t_4;
output += "\n\n";
(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : context.getBlock("content"))(env, context, frame, runtime, function(t_7,t_6) {
if(t_7) { cb(t_7); return; }
output += t_6;
output += "\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
})})});
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
function b_title(env, context, frame, runtime, cb) {
var lineno = 1;
var colno = 3;
var output = "";
try {
var frame = frame.push(true);
output += "Товары";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
function b_content(env, context, frame, runtime, cb) {
var lineno = 3;
var colno = 3;
var output = "";
try {
var frame = frame.push(true);
output += "\n<div class=\"d-flex align-items-center justify-content-between mb-3 flex-wrap gap-2\">\n    <h4 class=\"mb-0\"><i class=\"bi bi-box-seam me-2\"></i>Товары</h4>\n    <a class=\"btn btn-primary\" href=\"#/products/new\"><i class=\"bi bi-plus-lg me-1\"></i>Добавить товар</a>\n</div>\n\n<div class=\"card shadow-sm mb-3\">\n    <div class=\"card-body py-2\">\n        <div class=\"row g-2 align-items-end\">\n            <div class=\"col-lg-4\">\n                <label class=\"form-label small text-body-secondary mb-0\" for=\"searchInput\">Поиск</label>\n                <div class=\"input-group\">\n                    <span class=\"input-group-text\"><i class=\"bi bi-search\"></i></span>\n                    <input type=\"search\" class=\"form-control\" id=\"searchInput\"\n                           placeholder=\"Название, артикул, место, категория…\" value=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "filters")),"search"), env.opts.autoescape);
output += "\">\n                </div>\n            </div>\n            <div class=\"col-lg-2\">\n                <label class=\"form-label small text-body-secondary mb-0\" for=\"categoryFilter\">Категория</label>\n                <select class=\"form-select\" id=\"categoryFilter\">\n                    <option value=\"\">Все категории</option>\n                    ";
frame = frame.push();
var t_10 = runtime.contextOrFrameLookup(context, frame, "categories");
if(t_10) {t_10 = runtime.fromIterator(t_10);
var t_9 = t_10.length;
for(var t_8=0; t_8 < t_10.length; t_8++) {
var t_11 = t_10[t_8];
frame.set("c", t_11);
frame.set("loop.index", t_8 + 1);
frame.set("loop.index0", t_8);
frame.set("loop.revindex", t_9 - t_8);
frame.set("loop.revindex0", t_9 - t_8 - 1);
frame.set("loop.first", t_8 === 0);
frame.set("loop.last", t_8 === t_9 - 1);
frame.set("loop.length", t_9);
output += "\n                    <option value=\"";
output += runtime.suppressValue(runtime.memberLookup((t_11),"id"), env.opts.autoescape);
output += "\" ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "filters")),"categoryId") == runtime.memberLookup((t_11),"id")) {
output += "selected";
;
}
output += ">";
output += runtime.suppressValue(runtime.memberLookup((t_11),"name"), env.opts.autoescape);
output += "</option>\n                    ";
;
}
}
frame = frame.pop();
output += "\n                </select>\n            </div>\n            <div class=\"col-lg-2\">\n                <label class=\"form-label small text-body-secondary mb-0\" for=\"sortSelect\">Сортировка</label>\n                <select class=\"form-select\" id=\"sortSelect\">\n                    <option value=\"name\" ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "filters")),"sort") == "name") {
output += "selected";
;
}
output += ">По названию</option>\n                    <option value=\"stock\" ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "filters")),"sort") == "stock") {
output += "selected";
;
}
output += ">По остатку</option>\n                    <option value=\"price\" ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "filters")),"sort") == "price") {
output += "selected";
;
}
output += ">По цене</option>\n                    <option value=\"last_receipt\" ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "filters")),"sort") == "last_receipt") {
output += "selected";
;
}
output += ">По дате поступления</option>\n                </select>\n            </div>\n            <div class=\"col-lg-2\">\n                <label class=\"form-label small text-body-secondary mb-0\" for=\"directionSelect\">Направление</label>\n                <select class=\"form-select\" id=\"directionSelect\">\n                    <option value=\"asc\" ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "filters")),"direction") == "asc") {
output += "selected";
;
}
output += ">По возрастанию</option>\n                    <option value=\"desc\" ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "filters")),"direction") == "desc") {
output += "selected";
;
}
output += ">По убыванию</option>\n                </select>\n            </div>\n            <div class=\"col-lg-2\">\n                <div class=\"form-check mt-1\">\n                    <input class=\"form-check-input\" type=\"checkbox\" id=\"archivedToggle\"\n                           ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "filters")),"includeArchived")) {
output += "checked";
;
}
output += ">\n                    <label class=\"form-check-label small\" for=\"archivedToggle\">Показывать архив</label>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n\n<div class=\"card shadow-sm\">\n    <div class=\"table-responsive\">\n        <table class=\"table table-hover align-middle mb-0\">\n            <thead>\n                <tr>\n                    <th></th>\n                    <th>Артикул</th>\n                    <th>Наименование</th>\n                    <th>Категория</th>\n                    <th class=\"text-end\">Остаток</th>\n                    <th class=\"text-end\">Цена, руб.</th>\n                    <th>Место хранения</th>\n                    <th>Поступление</th>\n                    <th class=\"text-end text-nowrap\">Действия</th>\n                </tr>\n            </thead>\n            <tbody id=\"productsBody\">\n                <tr><td colspan=\"9\" class=\"text-center text-body-secondary py-4\">Загрузка…</td></tr>\n            </tbody>\n        </table>\n    </div>\n    <div class=\"card-footer bg-transparent small text-body-secondary\" id=\"productsCount\"></div>\n</div>\n";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
b_title: b_title,
b_content: b_content,
root: root
};

})();
})();

(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["product_detail.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
env.getTemplate("base.html", true, "product_detail.html", false, function(t_3,t_2) {
if(t_3) { cb(t_3); return; }
parentTemplate = t_2
for(var t_1 in parentTemplate.blocks) {
context.addBlock(t_1, parentTemplate.blocks[t_1]);
}
output += "\n";
(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : context.getBlock("title"))(env, context, frame, runtime, function(t_5,t_4) {
if(t_5) { cb(t_5); return; }
output += t_4;
output += "\n\n";
(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : context.getBlock("content"))(env, context, frame, runtime, function(t_7,t_6) {
if(t_7) { cb(t_7); return; }
output += t_6;
output += "\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
})})});
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
function b_title(env, context, frame, runtime, cb) {
var lineno = 1;
var colno = 3;
var output = "";
try {
var frame = frame.push(true);
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "product")),"name"), env.opts.autoescape);
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
function b_content(env, context, frame, runtime, cb) {
var lineno = 3;
var colno = 3;
var output = "";
try {
var frame = frame.push(true);
output += "\n<div class=\"d-flex align-items-center justify-content-between mb-3 flex-wrap gap-2\">\n    <h4 class=\"mb-0\">\n        <a class=\"text-body-secondary text-decoration-none me-2\" href=\"#/products\"><i class=\"bi bi-arrow-left\"></i></a>\n        ";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "product")),"name"), env.opts.autoescape);
output += "\n        ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "product")),"is_low")) {
output += "<span class=\"badge text-bg-danger ms-2\">ниже минимума</span>";
;
}
output += "\n        ";
if(!runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "product")),"is_active")) {
output += "<span class=\"badge text-bg-secondary ms-2\">архив</span>";
;
}
output += "\n    </h4>\n    <div class=\"btn-group\">\n        <a class=\"btn btn-outline-primary\" href=\"#/products/";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "product")),"id"), env.opts.autoescape);
output += "/edit\"><i class=\"bi bi-pencil me-1\"></i>Редактировать</a>\n        <button type=\"button\" class=\"btn btn-outline-secondary\" id=\"archiveBtn\" data-archived=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "product")),"is_active"), env.opts.autoescape);
output += "\">\n            <i class=\"bi ";
output += runtime.suppressValue((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "product")),"is_active")?"bi-box-arrow-in-down":"bi-arrow-counterclockwise"), env.opts.autoescape);
output += " me-1\"></i>\n            ";
output += runtime.suppressValue((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "product")),"is_active")?"В архив":"Вернуть"), env.opts.autoescape);
output += "\n        </button>\n        <button type=\"button\" class=\"btn btn-outline-danger\" id=\"deleteBtn\"><i class=\"bi bi-trash me-1\"></i>Удалить</button>\n    </div>\n</div>\n\n<div class=\"row g-3\">\n    <div class=\"col-lg-5\">\n        <div class=\"card shadow-sm\">\n            <div class=\"card-header bg-transparent\">Карточка товара</div>\n            <div class=\"card-body\">\n                ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "product")),"image_url")) {
output += "\n                <div class=\"text-center mb-3\">\n                    <img src=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "product")),"image_url"), env.opts.autoescape);
output += "\" alt=\"\" class=\"img-fluid rounded border d-block mx-auto\">\n                </div>\n                ";
;
}
output += "\n\n                <dl class=\"row mb-0\">\n                    <dt class=\"col-5 text-body-secondary\">Артикул</dt>\n                    <dd class=\"col-7\">";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "product")),"article"), env.opts.autoescape);
output += "</dd>\n\n                    <dt class=\"col-5 text-body-secondary\">Категория</dt>\n                    <dd class=\"col-7\">";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "product")),"category_name") || "—", env.opts.autoescape);
output += "</dd>\n\n                    <dt class=\"col-5 text-body-secondary\">Единица изм.</dt>\n                    <dd class=\"col-7\">";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "product")),"unit_name") || "—", env.opts.autoescape);
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "product")),"unit_short")) {
output += " (";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "product")),"unit_short"), env.opts.autoescape);
output += ")";
;
}
output += "</dd>\n\n                    <dt class=\"col-5 text-body-secondary\">Текущий остаток</dt>\n                    <dd class=\"col-7 fw-bold ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "product")),"is_low")) {
output += "text-danger";
;
}
output += "\">\n                        ";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "product")),"current_stock"), env.opts.autoescape);
output += " ";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "product")),"unit_short") || "", env.opts.autoescape);
output += "\n                    </dd>\n\n                    <dt class=\"col-5 text-body-secondary\">Минимальный остаток</dt>\n                    <dd class=\"col-7\">";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "product")),"min_stock"), env.opts.autoescape);
output += "</dd>\n\n                    <dt class=\"col-5 text-body-secondary\">Цена</dt>\n                    <dd class=\"col-7\">";
output += runtime.suppressValue(env.getFilter("round").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "product")),"price"),2), env.opts.autoescape);
output += " руб.</dd>\n\n                    <dt class=\"col-5 text-body-secondary\">Место хранения</dt>\n                    <dd class=\"col-7\">";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "product")),"location") || "—", env.opts.autoescape);
output += "</dd>\n\n                    <dt class=\"col-5 text-body-secondary\">Создан</dt>\n                    <dd class=\"col-7 small\">";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "product")),"created_at"), env.opts.autoescape);
output += "</dd>\n\n                    <dt class=\"col-5 text-body-secondary\">Обновлён</dt>\n                    <dd class=\"col-7 small\">";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "product")),"updated_at"), env.opts.autoescape);
output += "</dd>\n                </dl>\n\n                ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "product")),"description")) {
output += "\n                <hr>\n                <div class=\"small text-body-secondary\">Описание</div>\n                <div>";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "product")),"description"), env.opts.autoescape);
output += "</div>\n                ";
;
}
output += "\n            </div>\n        </div>\n    </div>\n\n    <div class=\"col-lg-7\">\n        <div class=\"card shadow-sm\">\n            <div class=\"card-header bg-transparent d-flex justify-content-between align-items-center\">\n                <span><i class=\"bi bi-clock-history me-2\"></i>История движений</span>\n                <a class=\"small\" href=\"#/movements\">весь журнал</a>\n            </div>\n            <div class=\"table-responsive\">\n                <table class=\"table table-hover align-middle mb-0\">\n                    <thead>\n                        <tr>\n                            <th>Дата</th>\n                            <th>Документ</th>\n                            <th>Операция</th>\n                            <th class=\"text-end\">Кол-во</th>\n                            <th class=\"text-end\">Цена</th>\n                            <th>Контрагент</th>\n                        </tr>\n                    </thead>\n                    <tbody>\n                    ";
frame = frame.push();
var t_10 = runtime.contextOrFrameLookup(context, frame, "movements");
if(t_10) {t_10 = runtime.fromIterator(t_10);
var t_9 = t_10.length;
for(var t_8=0; t_8 < t_10.length; t_8++) {
var t_11 = t_10[t_8];
frame.set("m", t_11);
frame.set("loop.index", t_8 + 1);
frame.set("loop.index0", t_8);
frame.set("loop.revindex", t_9 - t_8);
frame.set("loop.revindex0", t_9 - t_8 - 1);
frame.set("loop.first", t_8 === 0);
frame.set("loop.last", t_8 === t_9 - 1);
frame.set("loop.length", t_9);
output += "\n                        <tr>\n                            <td class=\"small\">";
output += runtime.suppressValue(env.getFilter("truncate").call(context, runtime.memberLookup((t_11),"created_at"),16,true,""), env.opts.autoescape);
output += "</td>\n                            <td>\n                                ";
if(runtime.memberLookup((t_11),"document_id")) {
output += "\n                                <a href=\"#/documents/";
output += runtime.suppressValue(runtime.memberLookup((t_11),"document_id"), env.opts.autoescape);
output += "\" class=\"text-decoration-none\">";
output += runtime.suppressValue(runtime.memberLookup((t_11),"doc_number") || ("№" + "" + runtime.memberLookup((t_11),"document_id")), env.opts.autoescape);
output += "</a>\n                                ";
;
}
else {
output += "—";
;
}
output += "\n                            </td>\n                            <td>\n                                <span class=\"badge text-bg-";
output += runtime.suppressValue((runtime.memberLookup((t_11),"movement_type") == "in"?"success":((runtime.memberLookup((t_11),"movement_type") == "out"?"warning":"danger"))), env.opts.autoescape);
output += "\">\n                                    ";
output += runtime.suppressValue(runtime.memberLookup(({"in": "Приход","out": "Расход","write_off": "Списание"}),runtime.memberLookup((t_11),"movement_type")) || runtime.memberLookup((t_11),"movement_type"), env.opts.autoescape);
output += "\n                                </span>\n                            </td>\n                            <td class=\"text-end fw-semibold\">\n                                ";
if(runtime.memberLookup((t_11),"movement_type") == "in") {
output += "+";
;
}
else {
output += "-";
;
}
output += runtime.suppressValue(runtime.memberLookup((t_11),"quantity"), env.opts.autoescape);
output += "\n                            </td>\n                            <td class=\"text-end\">";
output += runtime.suppressValue(env.getFilter("round").call(context, runtime.memberLookup((t_11),"price_at_moment"),2), env.opts.autoescape);
output += "</td>\n                            <td class=\"small text-body-secondary\">";
output += runtime.suppressValue(runtime.memberLookup((t_11),"counterparty_name") || "—", env.opts.autoescape);
output += "</td>\n                        </tr>\n                    ";
;
}
}
if (!t_9) {
output += "\n                        <tr><td colspan=\"6\" class=\"text-center text-body-secondary py-4\">Движений по товару ещё нет</td></tr>\n                    ";
}
frame = frame.pop();
output += "\n                    </tbody>\n                </table>\n            </div>\n        </div>\n    </div>\n</div>\n";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
b_title: b_title,
b_content: b_content,
root: root
};

})();
})();

(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["product_form.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
env.getTemplate("base.html", true, "product_form.html", false, function(t_3,t_2) {
if(t_3) { cb(t_3); return; }
parentTemplate = t_2
for(var t_1 in parentTemplate.blocks) {
context.addBlock(t_1, parentTemplate.blocks[t_1]);
}
output += "\n";
(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : context.getBlock("title"))(env, context, frame, runtime, function(t_5,t_4) {
if(t_5) { cb(t_5); return; }
output += t_4;
output += "\n\n";
(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : context.getBlock("content"))(env, context, frame, runtime, function(t_7,t_6) {
if(t_7) { cb(t_7); return; }
output += t_6;
output += "\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
})})});
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
function b_title(env, context, frame, runtime, cb) {
var lineno = 1;
var colno = 3;
var output = "";
try {
var frame = frame.push(true);
output += runtime.suppressValue((runtime.contextOrFrameLookup(context, frame, "isNew")?"Новый товар":"Редактирование товара"), env.opts.autoescape);
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
function b_content(env, context, frame, runtime, cb) {
var lineno = 3;
var colno = 3;
var output = "";
try {
var frame = frame.push(true);
output += "\n<div class=\"d-flex align-items-center justify-content-between mb-3\">\n    <h4 class=\"mb-0\">\n        <a class=\"text-body-secondary text-decoration-none me-2\" href=\"#/products\"><i class=\"bi bi-arrow-left\"></i></a>\n        ";
output += runtime.suppressValue((runtime.contextOrFrameLookup(context, frame, "isNew")?"Новый товар":"Редактирование товара"), env.opts.autoescape);
output += "\n    </h4>\n</div>\n\n<form id=\"productForm\" class=\"card shadow-sm\">\n    <div class=\"card-body\">\n        <div class=\"row g-3\">\n            <div class=\"col-lg-8\">\n                <div class=\"row g-3\">\n                    <div class=\"col-md-4\">\n                        <label class=\"form-label\" for=\"article\">Артикул (SKU) *</label>\n                        <input type=\"text\" class=\"form-control\" id=\"article\" name=\"article\" required maxlength=\"50\"\n                               value=\"";
output += runtime.suppressValue((runtime.contextOrFrameLookup(context, frame, "product")?runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "product")),"article"):""), env.opts.autoescape);
output += "\" placeholder=\"напр. BLT-M8-050\">\n                    </div>\n                    <div class=\"col-md-8\">\n                        <label class=\"form-label\" for=\"name\">Наименование *</label>\n                        <input type=\"text\" class=\"form-control\" id=\"name\" name=\"name\" required maxlength=\"200\"\n                               value=\"";
output += runtime.suppressValue((runtime.contextOrFrameLookup(context, frame, "product")?runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "product")),"name"):""), env.opts.autoescape);
output += "\" placeholder=\"напр. Болт М8х50 оцинкованный\">\n                    </div>\n\n                    <div class=\"col-md-6\">\n                        <label class=\"form-label\" for=\"categoryId\">Категория</label>\n                        <select class=\"form-select\" id=\"categoryId\" name=\"category_id\">\n                            <option value=\"\">— без категории —</option>\n                            ";
frame = frame.push();
var t_10 = runtime.contextOrFrameLookup(context, frame, "categories");
if(t_10) {t_10 = runtime.fromIterator(t_10);
var t_9 = t_10.length;
for(var t_8=0; t_8 < t_10.length; t_8++) {
var t_11 = t_10[t_8];
frame.set("c", t_11);
frame.set("loop.index", t_8 + 1);
frame.set("loop.index0", t_8);
frame.set("loop.revindex", t_9 - t_8);
frame.set("loop.revindex0", t_9 - t_8 - 1);
frame.set("loop.first", t_8 === 0);
frame.set("loop.last", t_8 === t_9 - 1);
frame.set("loop.length", t_9);
output += "\n                            <option value=\"";
output += runtime.suppressValue(runtime.memberLookup((t_11),"id"), env.opts.autoescape);
output += "\" ";
if(runtime.contextOrFrameLookup(context, frame, "product") && runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "product")),"category_id") == runtime.memberLookup((t_11),"id")) {
output += "selected";
;
}
output += ">\n                                ";
output += runtime.suppressValue(runtime.memberLookup((t_11),"name"), env.opts.autoescape);
output += "\n                            </option>\n                            ";
;
}
}
frame = frame.pop();
output += "\n                        </select>\n                        <div class=\"form-text\">Новую категорию можно создать в разделе «Справочники».</div>\n                    </div>\n                    <div class=\"col-md-6\">\n                        <label class=\"form-label\" for=\"unitId\">Единица измерения *</label>\n                        <select class=\"form-select\" id=\"unitId\" name=\"unit_id\" required>\n                            <option value=\"\">— выберите —</option>\n                            ";
frame = frame.push();
var t_14 = runtime.contextOrFrameLookup(context, frame, "units");
if(t_14) {t_14 = runtime.fromIterator(t_14);
var t_13 = t_14.length;
for(var t_12=0; t_12 < t_14.length; t_12++) {
var t_15 = t_14[t_12];
frame.set("u", t_15);
frame.set("loop.index", t_12 + 1);
frame.set("loop.index0", t_12);
frame.set("loop.revindex", t_13 - t_12);
frame.set("loop.revindex0", t_13 - t_12 - 1);
frame.set("loop.first", t_12 === 0);
frame.set("loop.last", t_12 === t_13 - 1);
frame.set("loop.length", t_13);
output += "\n                            <option value=\"";
output += runtime.suppressValue(runtime.memberLookup((t_15),"id"), env.opts.autoescape);
output += "\" ";
if(runtime.contextOrFrameLookup(context, frame, "product") && runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "product")),"unit_id") == runtime.memberLookup((t_15),"id")) {
output += "selected";
;
}
output += ">\n                                ";
output += runtime.suppressValue(runtime.memberLookup((t_15),"name"), env.opts.autoescape);
output += " (";
output += runtime.suppressValue(runtime.memberLookup((t_15),"short_name"), env.opts.autoescape);
output += ")\n                            </option>\n                            ";
;
}
}
frame = frame.pop();
output += "\n                        </select>\n                    </div>\n\n                    <div class=\"col-md-3\">\n                        <label class=\"form-label\" for=\"currentStock\">Текущий остаток</label>\n                        <input type=\"number\" class=\"form-control\" id=\"currentStock\" name=\"current_stock\" min=\"0\" step=\"1\"\n                               value=\"";
output += runtime.suppressValue((runtime.contextOrFrameLookup(context, frame, "product")?runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "product")),"current_stock"):0), env.opts.autoescape);
output += "\">\n                    </div>\n                    <div class=\"col-md-3\">\n                        <label class=\"form-label\" for=\"minStock\">Мин. остаток</label>\n                        <input type=\"number\" class=\"form-control\" id=\"minStock\" name=\"min_stock\" min=\"0\" step=\"1\"\n                               value=\"";
output += runtime.suppressValue((runtime.contextOrFrameLookup(context, frame, "product")?runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "product")),"min_stock"):0), env.opts.autoescape);
output += "\">\n                        <div class=\"form-text\">0 — уведомления отключены</div>\n                    </div>\n                    <div class=\"col-md-3\">\n                        <label class=\"form-label\" for=\"price\">Цена, руб.</label>\n                        <input type=\"number\" class=\"form-control\" id=\"price\" name=\"price\" min=\"0\" step=\"0.01\"\n                               value=\"";
output += runtime.suppressValue((runtime.contextOrFrameLookup(context, frame, "product")?runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "product")),"price"):0), env.opts.autoescape);
output += "\">\n                    </div>\n                    <div class=\"col-md-3\">\n                        <label class=\"form-label\" for=\"location\">Место хранения</label>\n                        <input type=\"text\" class=\"form-control\" id=\"location\" name=\"location\" maxlength=\"100\"\n                               value=\"";
output += runtime.suppressValue((runtime.contextOrFrameLookup(context, frame, "product")?runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "product")),"location"):""), env.opts.autoescape);
output += "\" placeholder=\"Стеллаж А-1, полка 2\">\n                    </div>\n\n                    <div class=\"col-12\">\n                        <label class=\"form-label\" for=\"description\">Описание</label>\n                        <textarea class=\"form-control\" id=\"description\" name=\"description\" rows=\"3\">";
output += runtime.suppressValue((runtime.contextOrFrameLookup(context, frame, "product")?runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "product")),"description"):""), env.opts.autoescape);
output += "</textarea>\n                    </div>\n\n                    <div class=\"col-12\">\n                        <div class=\"form-check form-switch\">\n                            <input class=\"form-check-input\" type=\"checkbox\" id=\"isActive\" name=\"is_active\"\n                                   ";
if(!runtime.contextOrFrameLookup(context, frame, "product") || runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "product")),"is_active")) {
output += "checked";
;
}
output += ">\n                            <label class=\"form-check-label\" for=\"isActive\">Активен (продаётся/учитывается)</label>\n                        </div>\n                    </div>\n                </div>\n            </div>\n\n            <div class=\"col-lg-4\">\n                <label class=\"form-label\">Фотография товара</label>\n                <div class=\"border rounded-3 p-2 text-center bg-body-secondary\" id=\"imageBox\">\n                    <div id=\"imagePlaceholder\" class=\"py-5 text-body-secondary";
output += runtime.suppressValue((runtime.contextOrFrameLookup(context, frame, "product") && runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "product")),"image_url")?" d-none":""), env.opts.autoescape);
output += "\">\n                        <i class=\"bi bi-image fs-1\"></i>\n                        <div class=\"small mt-2\">Изображение не выбрано</div>\n                    </div>\n                    <img src=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "product")),"image_url") || "", env.opts.autoescape);
output += "\" id=\"imagePreview\" alt=\"\"\n                         class=\"img-fluid rounded";
output += runtime.suppressValue((!(runtime.contextOrFrameLookup(context, frame, "product") && runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "product")),"image_url"))?" d-none":""), env.opts.autoescape);
output += "\">\n                </div>\n                <input type=\"hidden\" id=\"imagePath\" name=\"image_path\" value=\"";
output += runtime.suppressValue((runtime.contextOrFrameLookup(context, frame, "product")?runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "product")),"image_path"):""), env.opts.autoescape);
output += "\">\n                <div class=\"d-grid gap-2 mt-2\">\n                    <button type=\"button\" class=\"btn btn-outline-primary\" id=\"pickImage\">\n                        <i class=\"bi bi-folder2-open me-1\"></i>Выбрать файл\n                    </button>\n                    <button type=\"button\" class=\"btn btn-outline-secondary\" id=\"clearImage\">\n                        <i class=\"bi bi-x-lg me-1\"></i>Убрать изображение\n                    </button>\n                </div>\n                <div class=\"form-text\" id=\"imagePathLabel\">";
output += runtime.suppressValue((runtime.contextOrFrameLookup(context, frame, "product")?runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "product")),"image_path"):""), env.opts.autoescape);
output += "</div>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"card-footer bg-transparent d-flex justify-content-end gap-2\">\n        <a class=\"btn btn-outline-secondary\" href=\"#/products\">Отмена</a>\n        <button type=\"submit\" class=\"btn btn-primary\">\n            <i class=\"bi bi-check-lg me-1\"></i>";
output += runtime.suppressValue((runtime.contextOrFrameLookup(context, frame, "isNew")?"Создать товар":"Сохранить изменения"), env.opts.autoescape);
output += "\n        </button>\n    </div>\n</form>\n";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
b_title: b_title,
b_content: b_content,
root: root
};

})();
})();

(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["settings.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
env.getTemplate("base.html", true, "settings.html", false, function(t_3,t_2) {
if(t_3) { cb(t_3); return; }
parentTemplate = t_2
for(var t_1 in parentTemplate.blocks) {
context.addBlock(t_1, parentTemplate.blocks[t_1]);
}
output += "\n";
(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : context.getBlock("title"))(env, context, frame, runtime, function(t_5,t_4) {
if(t_5) { cb(t_5); return; }
output += t_4;
output += "\n\n";
(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : context.getBlock("content"))(env, context, frame, runtime, function(t_7,t_6) {
if(t_7) { cb(t_7); return; }
output += t_6;
output += "\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
})})});
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
function b_title(env, context, frame, runtime, cb) {
var lineno = 1;
var colno = 3;
var output = "";
try {
var frame = frame.push(true);
output += "Настройки";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
function b_content(env, context, frame, runtime, cb) {
var lineno = 3;
var colno = 3;
var output = "";
try {
var frame = frame.push(true);
output += "\n<div class=\"d-flex align-items-center justify-content-between mb-3\">\n    <h4 class=\"mb-0\"><i class=\"bi bi-gear me-2\"></i>Настройки</h4>\n</div>\n\n<div class=\"row g-3\">\n    <div class=\"col-lg-6\">\n        <div class=\"card shadow-sm\">\n            <div class=\"card-header bg-transparent\">\n                <i class=\"bi bi-person-badge me-2\"></i>Оператор и безопасность\n            </div>\n            <div class=\"card-body\">\n                <p class=\"small text-body-secondary\">\n                    Оператор указывается в печатных документах. PIN-код хранится в зашифрованном виде\n                    через <code>electron.safeStorage</code> и запрашивается при формировании PDF.\n                </p>\n\n                <form id=\"secureForm\">\n                    <div class=\"mb-3\">\n                        <label class=\"form-label\" for=\"operatorInput\">Имя оператора</label>\n                        <input class=\"form-control\" id=\"operatorInput\" maxlength=\"100\"\n                               placeholder=\"напр. Кораблёв А.П.\" value=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "secure")),"operator") || "", env.opts.autoescape);
output += "\">\n                    </div>\n\n                    <div class=\"mb-3\">\n                        <label class=\"form-label\" for=\"pinNewInput\">\n                            PIN-код\n                            <span class=\"badge text-bg-";
output += runtime.suppressValue((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "secure")),"hasPin")?"success":"secondary"), env.opts.autoescape);
output += " ms-1\">\n                                ";
output += runtime.suppressValue((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "secure")),"hasPin")?"установлен":"не задан"), env.opts.autoescape);
output += "\n                            </span>\n                        </label>\n                        <input class=\"form-control\" id=\"pinNewInput\" type=\"password\" inputmode=\"numeric\"\n                               maxlength=\"12\" autocomplete=\"new-password\" placeholder=\"4–12 символов\">\n                        <div class=\"form-text\">Оставьте пустым, чтобы не менять. Чтобы удалить — нажмите «Снять PIN».</div>\n                    </div>\n\n                    <div class=\"d-flex gap-2\">\n                        <button class=\"btn btn-primary\" type=\"submit\">\n                            <i class=\"bi bi-check-lg me-1\"></i>Сохранить\n                        </button>\n                        <button class=\"btn btn-outline-danger\" type=\"button\" id=\"clearPinBtn\">\n                            <i class=\"bi bi-shield-x me-1\"></i>Снять PIN\n                        </button>\n                    </div>\n                </form>\n\n                <hr>\n                <div class=\"d-flex flex-wrap gap-2\">\n                    <button class=\"btn btn-outline-secondary btn-sm\" id=\"notifyTestBtn\">\n                        <i class=\"bi bi-bell me-1\"></i>Проверить уведомления\n                    </button>\n                </div>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"col-lg-6\">\n        <div class=\"card shadow-sm\">\n            <div class=\"card-header bg-transparent\">\n                <i class=\"bi bi-hdd me-2\"></i>Хранилище данных\n            </div>\n            <div class=\"card-body\">\n                <dl class=\"row mb-0\">\n                    <dt class=\"col-5 text-body-secondary\">Папка данных</dt>\n                    <dd class=\"col-7 text-break small\">";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "info")),"userData"), env.opts.autoescape);
output += "</dd>\n\n                    <dt class=\"col-5 text-body-secondary\">База данных</dt>\n                    <dd class=\"col-7 text-break small\">";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "info")),"dbPath"), env.opts.autoescape);
output += "</dd>\n\n                    <dt class=\"col-5 text-body-secondary\">Версия приложения</dt>\n                    <dd class=\"col-7 small\">";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "info")),"version"), env.opts.autoescape);
output += "</dd>\n\n                    <dt class=\"col-5 text-body-secondary\">Платформа</dt>\n                    <dd class=\"col-7 small\">";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "info")),"platform"), env.opts.autoescape);
output += "</dd>\n                </dl>\n            </div>\n        </div>\n\n        <div class=\"card shadow-sm mt-3\">\n            <div class=\"card-header bg-transparent\">\n                <i class=\"bi bi-shield-check me-2\"></i>Безопасность Electron\n            </div>\n            <ul class=\"list-group list-group-flush small\">\n                <li class=\"list-group-item\"><code>contextIsolation: true</code> — изоляция контекста рендерера</li>\n                <li class=\"list-group-item\"><code>nodeIntegration: false</code> — без Node.js в рендерере</li>\n                <li class=\"list-group-item\"><code>preload.js</code> + <code>contextBridge</code> — мост <code>window.api</code></li>\n                <li class=\"list-group-item\"><code>safeStorage</code> — шифрование PIN и токенов</li>\n                <li class=\"list-group-item\">Файловая система и SQLite доступны только в Main-процессе</li>\n            </ul>\n        </div>\n    </div>\n</div>\n";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
b_title: b_title,
b_content: b_content,
root: root
};

})();
})();



  function getEnv() {
    if (env) return env;
    env = new nunjucks.Environment(null, { autoescape: true });
    for (var key in templates) {
      if (Object.prototype.hasOwnProperty.call(templates, key)) {
        env.templates[key] = templates[key];
      }
    }
    return env;
  }

  global.renderPage = function (name, context) {
    return getEnv().render(name, context || {});
  };
})(window);
