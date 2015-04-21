(function (root, factory) {
    'use strict';

    /*global define*/
    if (typeof define === 'function' && define.amd) {
        define(['moment'], factory);                 // AMD
    } else if (typeof exports === 'object') {
        module.exports = factory(require('moment')); // Node
    } else {
        factory(root.moment);                        // Browser
    }
}(this, function (moment) {
    'use strict';

    // Do not load moment-timezone a second time.
    if (moment.fn.formatInterval !== undefined) { return moment; }

    var regex = new RegExp("(G+|y+|Y+|M+|w+|W+|D+|d+|F+|E+|u+|a+|H+|k+|K+|h+|m+|s+|S+|z+|Z+|v+|V+)|'((?:[^']|'')+)'|('')", 'g');

    function getFormat(end) {
        var loc = locale[moment.locale()],
            formats = locale.formats;

        if (this.isSame(end, 'day')) {
            var is12h = this.localeData().longDateFormat('LT').toLowerCase().indexOf('a') > -1,
                f = is12h ? loc.hm : loc.Hm,
                m = moment.localeData().meridiem;

            if (is12h && (m(this.hours(), this.minutes(), true) !== m(end.hours(), end.minutes(), true))) {
                return formats[f.a];
            } else if (!this.isSame(end, 'hour')) {
                return formats[is12h ? f.h : f.H];
            } else if (!this.isSame(end, 'minute')) {
                return formats[f.m];
            }
            return 'LT';
        } else {
            var f = loc.yMMMEd;
            if (!this.isSame(end, 'year')) {
                return formats[f.y];
            } else if (!this.isSame(end, 'month')) {
                return formats[f.M];
            } else if (!this.isSame(end, 'day')) {
                return formats[f.d];
            } else {
                return 'llll';
            }
        }
    }

    function formatInterval(end) {
        var fields = {}, match,
            format = getFormat.call(this, end);
        regex.lastIndex = 0;
        while ((match = regex.exec(format))) {
            if (!match[1]) continue;
            var letter = match[1].charAt(0);
            if (fields[letter]) break;
            fields[letter] = true;
        }
        if (regex.lastIndex) {
            return this.format(format.slice(0, match.index)) + end.format(format.slice(match.index));
        } else {
            return this.format(format);
        }
    }

    moment.fn.formatInterval = function (endMoment) {
        if (!endMoment) {
            return this.format('llll');
        }
        // parse to moment
        endMoment = moment(endMoment);

        return formatInterval.call(this, endMoment);
    };

    var locale = {"af":{"hm":{"a":0,"h":1,"m":2},"Hm":{"H":3,"m":3},"yMMMEd":{"d":4,"M":5,"y":6}},"ar-ma":{"hm":{"a":7,"h":8,"m":9},"Hm":{"H":3,"m":3},"yMMMEd":{"d":10,"M":11,"y":12}},"ar-sa":{"hm":{"a":13,"h":14,"m":15},"Hm":{"H":3,"m":3},"yMMMEd":{"d":16,"M":17,"y":18}},"ar-tn":{"hm":{"a":19,"h":20,"m":21},"Hm":{"H":3,"m":3},"yMMMEd":{"d":22,"M":23,"y":24}},"ar":{"hm":{"a":25,"h":26,"m":27},"Hm":{"H":3,"m":3},"yMMMEd":{"d":28,"M":29,"y":30}},"az":{"hm":{"a":31,"h":32,"m":33},"Hm":{"H":3,"m":3},"yMMMEd":{"d":34,"M":35,"y":36}},"be":{"hm":{"h":37,"m":38},"Hm":{"H":39,"m":39},"yMMMEd":{"d":40,"M":41,"y":42}},"bg":{"hm":{"a":43,"h":44,"m":45},"Hm":{"H":46,"m":46},"yMMMEd":{"d":47,"M":48,"y":49}},"bn":{"hm":{"a":50,"h":51,"m":52},"Hm":{"H":3,"m":3},"yMMMEd":{"d":53,"M":54,"y":55}},"bo":{"hm":{"a":56,"h":57,"m":58},"Hm":{"H":3,"m":3},"yMMMEd":{"d":59,"M":60,"y":61}},"br":{"yMMMEd":{"d":62,"M":63,"y":64},"hm":{"a":65,"h":66,"m":67},"Hm":{"H":3,"m":3}},"bs":{"hm":{"a":68,"h":69,"m":70},"Hm":{"H":3,"m":3},"yMMMEd":{"d":71,"M":72,"y":73}},"ca":{"hm":{"a":74,"h":75,"m":76},"Hm":{"H":46,"m":46},"yMMMEd":{"d":77,"M":78,"y":79}},"cs":{"hm":{"a":80,"h":81,"m":82},"Hm":{"H":83,"m":83},"yMMMEd":{"d":84,"M":85,"y":86}},"cv":{"hm":{"a":87,"h":88,"m":89},"Hm":{"H":3,"m":3},"yMMMEd":{"d":90,"M":91,"y":92}},"cy":{"hm":{"a":93,"h":94,"m":95},"Hm":{"H":3,"m":3},"yMMMEd":{"d":96,"M":97,"y":98}},"da":{"hm":{"a":99,"h":100,"m":101},"Hm":{"H":39,"m":39},"yMMMEd":{"d":102,"M":103,"y":104}},"de-at":{"hm":{"a":105,"h":106,"m":107},"Hm":{"H":3,"m":3},"yMMMEd":{"d":108,"M":109,"y":110}},"de":{"hm":{"a":111,"h":112,"m":113},"Hm":{"H":3,"m":3},"yMMMEd":{"d":114,"M":115,"y":116}},"el":{"hm":{"a":117,"h":118,"m":119},"Hm":{"H":3,"m":3},"yMMMEd":{"d":120,"M":121,"y":122}},"en-au":{"hm":{"a":123,"h":124,"m":125},"Hm":{"H":126,"m":126},"yMMMEd":{"d":127,"M":128,"y":129}},"en-ca":{"yMMMEd":{"d":130,"M":131,"y":132},"hm":{"a":133,"h":134,"m":135},"Hm":{"H":126,"m":126}},"en-gb":{"hm":{"a":136,"h":137,"m":138},"Hm":{"H":126,"m":126},"yMMMEd":{"d":139,"M":140,"y":141}},"eo":{"hm":{"h":142,"m":143},"Hm":{"H":3,"m":3},"yMMMEd":{"d":144,"M":145,"y":146}},"es":{"hm":{"a":147,"h":148,"m":149},"Hm":{"H":83,"m":83},"yMMMEd":{"d":150,"M":151,"y":152}},"et":{"hm":{"a":153,"h":154,"m":155},"Hm":{"H":39,"m":39},"yMMMEd":{"d":156,"M":157,"y":158}},"eu":{"hm":{"a":159,"h":160,"m":161},"Hm":{"H":3,"m":3},"yMMMEd":{"d":162,"M":163,"y":164}},"fa":{"hm":{"a":165,"h":166,"m":167},"Hm":{"H":168,"m":168},"yMMMEd":{"d":169,"M":170,"y":171}},"fi":{"hm":{"a":172,"h":173,"m":174},"Hm":{"H":175,"m":175},"yMMMEd":{"d":176,"M":177,"y":178}},"fo":{"hm":{"a":179,"h":180,"m":181},"Hm":{"H":3,"m":3},"yMMMEd":{"d":182,"M":183,"y":184}},"fr-ca":{"hm":{"a":185,"h":186,"m":187},"Hm":{"H":126,"m":126},"yMMMEd":{"d":188,"M":189,"y":190}},"fr":{"hm":{"a":191,"h":192,"m":193},"Hm":{"H":126,"m":126},"yMMMEd":{"d":194,"M":195,"y":196}},"fy":{"hm":{"a":197,"h":198,"m":199},"Hm":{"H":3,"m":3},"yMMMEd":{"d":200,"M":201,"y":202}},"gl":{"hm":{"a":203,"h":204,"m":205},"Hm":{"H":3,"m":3},"yMMMEd":{"d":206,"M":207,"y":208}},"he":{"hm":{"a":209,"h":210,"m":211},"Hm":{"H":83,"m":83},"yMMMEd":{"d":212,"M":213,"y":214}},"hi":{"hm":{"a":215,"h":216,"m":217},"Hm":{"H":3,"m":3},"yMMMEd":{"d":218,"M":219,"y":220}},"hr":{"hm":{"a":221,"h":222,"m":223},"Hm":{"H":126,"m":126},"yMMMEd":{"d":224,"M":225,"y":226}},"hu":{"hm":{"a":227,"h":228,"m":229},"Hm":{"H":83,"m":83},"yMMMEd":{"d":230,"M":231,"y":232}},"hy-am":{"hm":{"a":233,"h":234,"m":235},"Hm":{"H":83,"m":83},"yMMMEd":{"d":236,"M":237,"y":238}},"id":{"hm":{"a":239,"h":240,"m":241},"Hm":{"H":39,"m":39},"yMMMEd":{"d":242,"M":243,"y":244}},"is":{"hm":{"a":245,"h":246,"m":247},"Hm":{"H":3,"m":3},"yMMMEd":{"d":248,"M":249,"y":250}},"it":{"hm":{"a":251,"h":252,"m":253},"Hm":{"H":3,"m":3},"yMMMEd":{"d":254,"M":255,"y":256}},"ja":{"hm":{"a":257,"h":258,"m":259},"Hm":{"H":260,"m":260},"yMMMEd":{"d":261,"M":262,"y":263}},"ka":{"hm":{"a":264,"h":265,"m":266},"Hm":{"H":3,"m":3},"yMMMEd":{"d":267,"M":268,"y":269}},"km":{"hm":{"a":270,"h":271,"m":272},"Hm":{"H":126,"m":126},"yMMMEd":{"d":273,"M":274,"y":275}},"ko":{"hm":{"a":276,"h":277,"m":278},"Hm":{"H":279,"m":279},"yMMMEd":{"d":280,"M":281,"y":282}},"lb":{"hm":{"a":283,"h":284,"m":285},"Hm":{"H":3,"m":3},"yMMMEd":{"d":286,"M":287,"y":288}},"lt":{"hm":{"a":289,"h":290,"m":291},"Hm":{"H":3,"m":3},"yMMMEd":{"d":292,"M":293,"y":294}},"lv":{"hm":{"a":295,"h":296,"m":297},"Hm":{"H":3,"m":3},"yMMMEd":{"d":298,"M":299,"y":300}},"mk":{"hm":{"a":301,"h":302,"m":303},"Hm":{"H":3,"m":3},"yMMMEd":{"d":304,"M":305,"y":306}},"ml":{"hm":{"a":307,"h":308,"m":309},"Hm":{"H":126,"m":126},"yMMMEd":{"d":310,"M":311,"y":312}},"mr":{"hm":{"a":313,"h":314,"m":315},"Hm":{"H":126,"m":126},"yMMMEd":{"d":316,"M":317,"y":318}},"ms-my":{"hm":{"a":319,"h":320,"m":321},"Hm":{"H":3,"m":3},"yMMMEd":{"d":322,"M":323,"y":324}},"my":{"hm":{"a":325,"h":326,"m":327},"Hm":{"H":3,"m":3},"yMMMEd":{"d":328,"M":329,"y":330}},"nb":{"hm":{"a":331,"h":332,"m":333},"Hm":{"H":39,"m":39},"yMMMEd":{"d":334,"M":335,"y":336}},"ne":{"hm":{"a":337,"h":338,"m":339},"Hm":{"H":3,"m":3},"yMMMEd":{"d":340,"M":341,"y":342}},"nl":{"hm":{"a":343,"h":344,"m":345},"Hm":{"H":3,"m":3},"yMMMEd":{"d":346,"M":347,"y":348}},"nn":{"hm":{"h":349,"m":350},"Hm":{"H":3,"m":3},"yMMMEd":{"d":351,"M":352,"y":353}},"pl":{"hm":{"a":354,"h":355,"m":356},"Hm":{"H":3,"m":3},"yMMMEd":{"d":357,"M":358,"y":359}},"pt-br":{"hm":{"a":360,"h":361,"m":362},"Hm":{"H":126,"m":126},"yMMMEd":{"d":363,"M":364,"y":365}},"pt":{"hm":{"a":366,"h":367,"m":368},"Hm":{"H":126,"m":126},"yMMMEd":{"d":369,"M":370,"y":371}},"ro":{"hm":{"a":372,"h":373,"m":374},"Hm":{"H":3,"m":3},"yMMMEd":{"d":375,"M":376,"y":377}},"ru":{"hm":{"a":378,"h":379,"m":380},"Hm":{"H":83,"m":83},"yMMMEd":{"d":381,"M":382,"y":383}},"sk":{"hm":{"a":384,"h":385,"m":386},"Hm":{"H":46,"m":46},"yMMMEd":{"d":387,"M":388,"y":389}},"sl":{"hm":{"a":390,"h":391,"m":392},"Hm":{"H":3,"m":3},"yMMMEd":{"d":393,"M":394,"y":395}},"sq":{"hm":{"a":396,"h":397,"m":398},"Hm":{"H":126,"m":126},"yMMMEd":{"d":399,"M":400,"y":401}},"sr-cyrl":{"hm":{"a":402,"h":403,"m":404},"Hm":{"H":39,"m":39},"yMMMEd":{"d":405,"M":406,"y":407}},"sr":{"hm":{"a":408,"h":409,"m":410},"Hm":{"H":39,"m":39},"yMMMEd":{"d":411,"M":412,"y":413}},"sv":{"hm":{"a":414,"h":415,"m":416},"Hm":{"H":3,"m":3},"yMMMEd":{"d":417,"M":418,"y":419}},"ta":{"hm":{"a":420,"h":421,"m":422},"Hm":{"H":126,"m":126},"yMMMEd":{"d":423,"M":424,"y":425}},"th":{"hm":{"a":426,"h":427,"m":428},"Hm":{"H":3,"m":3},"yMMMEd":{"d":429,"M":430,"y":431}},"tl-ph":{"hm":{"a":432,"h":433,"m":434},"Hm":{"H":3,"m":3},"yMMMEd":{"d":435,"M":436,"y":437}},"tr":{"hm":{"a":438,"h":439,"m":440},"Hm":{"H":3,"m":3},"yMMMEd":{"d":441,"M":442,"y":443}},"tzm-latn":{"hm":{"a":444,"h":445,"m":446},"Hm":{"H":3,"m":3},"yMMMEd":{"d":447,"M":448,"y":449}},"tzm":{"hm":{"a":450,"h":451,"m":452},"Hm":{"H":3,"m":3},"yMMMEd":{"d":453,"M":454,"y":455}},"uk":{"hm":{"a":456,"h":457,"m":458},"Hm":{"H":3,"m":3},"yMMMEd":{"d":459,"M":460,"y":461}},"uz":{"hm":{"a":462,"h":463,"m":464},"Hm":{"H":3,"m":3},"yMMMEd":{"d":465,"M":466,"y":467}},"vi":{"hm":{"a":468,"h":469,"m":470},"Hm":{"H":3,"m":3},"yMMMEd":{"d":471,"M":472,"y":473}},"zh-cn":{"hm":{"a":474,"h":475,"m":476},"Hm":{"H":3,"m":3},"yMMMEd":{"d":477,"M":478,"y":479}},"zh-tw":{"hm":{"a":480,"h":481,"m":482},"Hm":{"H":3,"m":3},"yMMMEd":{"d":483,"M":484,"y":485}},"en":{"hm":{"a":486,"h":487,"m":488},"Hm":{"H":126,"m":126},"yMMMEd":{"d":489,"M":490,"y":491}},"formats":["h:mm A – h:mm A","h:mm–h:mm A","h:mm–h:mm A","HH:mm–HH:mm","ddd, D MMM – ddd, D MMM, YYYY","ddd, D MMM – ddd, D MMM, YYYY","ddd, MMM D, YYYY – ddd, MMM D, YYYY","h:mm A – h:mm A","h:mm–h:mm A","h:mm–h:mm A","ddd، D – ddd، D MMM، YYYY","ddd، D MMM – ddd، D MMM، YYYY","ddd، D MMM، YYYY – ddd، D MMM، YYYY","h:mm A – h:mm A","h:mm–h:mm A","h:mm–h:mm A","ddd، D – ddd، D MMM، YYYY","ddd، D MMM – ddd، D MMM، YYYY","ddd، D MMM، YYYY – ddd، D MMM، YYYY","h:mm A – h:mm A","h:mm–h:mm A","h:mm–h:mm A","ddd، D – ddd، D MMM، YYYY","ddd، D MMM – ddd، D MMM، YYYY","ddd، D MMM، YYYY – ddd، D MMM، YYYY","h:mm A – h:mm A","h:mm–h:mm A","h:mm–h:mm A","ddd، D – ddd، D MMM، YYYY","ddd، D MMM – ddd، D MMM، YYYY","ddd، D MMM، YYYY – ddd، D MMM، YYYY","h:mm A – h:mm A","h:mm–h:mm A","h:mm–h:mm A","D MMM YYYY, ddd – D MMM, ddd","D MMM YYYY, ddd – D MMM, ddd","D MMM YYYY, ddd – D MMM YYYY, ddd","h.mm–h.mm A","h.mm–h.mm A","HH.mm–HH.mm","ddd, D – ddd, D MMM YYYY","ddd, D MMM – ddd, D MMM YYYY","ddd, D MMM YYYY – ddd, D MMM YYYY","h:mm A – h:mm A","h:mm – h:mm A","h:mm – h:mm A","H:mm – H:mm","ddd, D.MM – ddd, D.MM.YYYY 'г'.","ddd, D.MM – ddd, D.MM.YYYY 'г'.","ddd, D.MM.YYYY 'г'. – ddd, D.MM.YYYY 'г'.","h:mm A – h:mm A","h:mm–h:mm A","h:mm–h:mm A","ddd, D MMM – ddd, D MMM, YYYY","ddd, D MMM – ddd, D MMM, YYYY","ddd, D MMM, YYYY – ddd, D MMM, YYYY","h:mm A – h:mm A","h:mm–h:mm A","h:mm–h:mm A","YYYY MMM D, ddd – MMM D, ddd","YYYY MMM D, ddd – MMM D, ddd","YYYY MMM D, ddd – YYYY MMM D, ddd","ddd D MMM – ddd D MMM YYYY","ddd D MMM – ddd D MMM YYYY","ddd D MMM YYYY – ddd D MMM YYYY","h:mm A – h:mm A","h:mm–h:mm A","h:mm–h:mm A","h:mm A – h:mm A","h:mm–h:mm A","h:mm–h:mm A","ddd, DD. – ddd, DD. MMM YYYY.","ddd, DD. MMM – ddd, DD. MMM YYYY.","ddd, DD. MMM YYYY. – ddd, DD. MMM YYYY.","h:mm A – h:mm A","h:mm–h:mm A","h:mm–h:mm A","ddd, D – ddd, D MMM YYYY","ddd, D MMM – ddd, D MMM YYYY","ddd, D MMM YYYY – ddd, D MMM YYYY","h:mm A – h:mm A","h:mm–h:mm A","h:mm–h:mm A","H:mm–H:mm","ddd D. M. – ddd D. M. YYYY","ddd D. M. – ddd D. M. YYYY","ddd D. M. YYYY – ddd D. M. YYYY","h:mm A – h:mm A","h:mm–h:mm A","h:mm–h:mm A","YYYY MMM D, ddd – MMM D, ddd","YYYY MMM D, ddd – MMM D, ddd","YYYY MMM D, ddd – YYYY MMM D, ddd","h:mm A – h:mm A","h:mm h:mm A","h:mm – h:mm A","ddd, D MMM – ddd, D MMM YYYY","ddd, D MMM – ddd, D MMM YYYY","ddd, D MMM, YYYY – ddd, D MMM YYYY","h.mm A – h.mm A","h.mm–h.mm A","h.mm–h.mm A","ddd 'Den' D. – ddd 'Den' D. MMM YYYY","ddd 'Den' D. MMM – ddd 'Den' D. MMM YYYY","ddd 'Den' D. MMM YYYY – ddd 'Den' D. MMM YYYY","h:mm A – h:mm A","h:mm–h:mm A","h:mm–h:mm A","ddd, D. – ddd, D. MMM YYYY","ddd, D. MMM – ddd, D. MMM YYYY","ddd, D. MMM YYYY – ddd, D. MMM YYYY","h:mm A – h:mm A","h:mm–h:mm A","h:mm–h:mm A","ddd, D. – ddd, D. MMM YYYY","ddd, D. MMM – ddd, D. MMM YYYY","ddd, D. MMM YYYY – ddd, D. MMM YYYY","h:mm A – h:mm A","h:mm–h:mm A","h:mm–h:mm A","ddd, DD MMM – ddd, DD MMM YYYY","ddd, DD MMM – ddd, DD MMM YYYY","ddd, DD MMM YYYY – ddd, DD MMM YYYY","h:mm A – h:mm A","h:mm – h:mm A","h:mm – h:mm A","HH:mm – HH:mm","ddd, MMM D – ddd, MMM D, YYYY","ddd, MMM D – ddd, MMM D, YYYY","ddd, MMM D, YYYY – ddd, MMM D, YYYY","ddd, MMM D – ddd, MMM D, YYYY","ddd, MMM D – ddd, MMM D, YYYY","ddd, MMM D, YYYY – ddd, MMM D, YYYY","h:mm A – h:mm A","h:mm – h:mm A","h:mm – h:mm A","h:mm A – h:mm A","h:mm – h:mm A","h:mm – h:mm A","ddd, MMM D – ddd, MMM D, YYYY","ddd, MMM D – ddd, MMM D, YYYY","ddd, MMM D, YYYY – ddd, MMM D, YYYY","h:mm–h:mm A","h:mm–h:mm A","ddd, D-'A' - ddd, D-'A' 'De' MMM YYYY","ddd, D-'A' 'De' MMM – ddd, D-'A' 'De' MMM YYYY","ddd, D-'A' 'De' MMM YYYY – ddd, D-'A' 'De' MMM YYYY","h:mm A – h:mm A","h:mm – h:mm A","h:mm – h:mm A","ddd, D MMM–ddd, D MMM YYYY","ddd, D MMM–ddd, D MMM YYYY","ddd, D MMM YYYY–ddd, D MMM YYYY","h:mm A – h:mm A","h:mm–h:mm A","h:mm–h:mm A","ddd, D. MMM–ddd, D. MMM YYYY","ddd, D. MMM–ddd, D. MMM YYYY","ddd, D. MMM YYYY–ddd, D. MMM YYYY","h:mm A – h:mm A","h:mm–h:mm A","h:mm–h:mm A","YYYY('e')'Ho' MMM D, ddd – YYYY('e')'Ho' MMM D, ddd","YYYY('e')'Ho' MMM D, ddd – MMM D, ddd","YYYY('e')'Ho' MMM D, ddd – YYYY('e')'Ho' MMM D, ddd","h:mm A تا h:mm A","h:mm تا h:mm A","h:mm تا h:mm A","H:mm تا H:mm","ddd D LLL تا ddd D MMM YYYY","ddd D LLL تا ddd D MMM YYYY","ddd D MMM YYYY تا ddd D MMM YYYY","h.mm A – h.mm A","h.mm–h.mm A","h.mm–h.mm A","H.mm–H.mm","ddd D. – ddd D. MMMM YYYY","ddd D. MMMM – ddd D. MMMM YYYY","ddd D. MMMM YYYY – ddd D. MMMM YYYY","h:mm A – h:mm A","h:mm–h:mm A","h:mm–h:mm A","ddd, YYYY-MM-DD – ddd, YYYY-MM-DD","ddd, YYYY-MM-DD – ddd, YYYY-MM-DD","ddd, YYYY-MM-DD – ddd, YYYY-MM-DD","h:mm A – h:mm A","h:mm – h:mm A","h:mm – h:mm A","ddd D – ddd D MMM YYYY","ddd D MMM – ddd D MMM YYYY","ddd D MMM YYYY – ddd D MMM YYYY","h:mm A – h:mm A","h:mm – h:mm A","h:mm – h:mm A","ddd D – ddd D MMM YYYY","ddd D MMM – ddd D MMM YYYY","ddd D MMM YYYY – ddd D MMM YYYY","h:mm A – h:mm A","h:mm–h:mm A","h:mm–h:mm A","ddd D – ddd D MMM YYYY","ddd D MMM – ddd D MMM YYYY","ddd D MMM YYYY – ddd D MMM YYYY","h:mm A – h:mm A","h:mm–h:mm A","h:mm–h:mm A","ddd, D MMM – ddd, D MMM, YYYY","ddd, D MMM – ddd, D MMM, YYYY","ddd, D MMM, YYYY – ddd, D MMM, YYYY","h:mm A – h:mm A","h:mm–h:mm A","h:mm–h:mm A","dddd D MMM – dddd D MMM YYYY","dddd D MMM – dddd D MMM YYYY","dddd D MMM YYYY – dddd D MMM YYYY","h:mm A – h:mm A","h:mm–h:mm A","h:mm–h:mm A","ddd, D MMM – ddd, D MMM YYYY","ddd, D MMM – ddd, D MMM YYYY","ddd, D MMM YYYY – ddd, D MMM YYYY","h:mm A – h:mm A","h:mm – h:mm A","h:mm – h:mm A","ddd, DD. – ddd, DD. MMM YYYY.","ddd, DD. MMM – ddd, DD. MMM YYYY.","ddd, DD. MMM YYYY. – ddd, DD. MMM YYYY.","A h:mm – A h:mm","A h:mm–h:mm","A h:mm–h:mm","YYYY. MMM D., ddd – D., ddd","YYYY. MMM D., ddd – MMM D., ddd","YYYY. MMM D., ddd – YYYY. MMM D., ddd","h:mm A – h:mm A","h:mm–h:mm A","h:mm–h:mm A","ddd, D MMM – ddd, D MMM, YYYYթ.","ddd, D MMM – ddd, D MMM, YYYYթ.","ddd, D MMM, YYYY – ddd, D MMM, YYYYթ.","h.mm A – h.mm A","h.mm–h.mm A","h.mm–h.mm A","ddd, D MMM – ddd, D MMM YYYY","ddd, D MMM – ddd, D MMM YYYY","ddd, D MMM YYYY – ddd, D MMM YYYY","h:mm A – h:mm A","h:mm–h:mm A","h:mm–h:mm A","ddd, D. – ddd, D. MMM YYYY","ddd, D. MMM – ddd, D. MMM YYYY","ddd, D. MMM YYYY – ddd, D. MMM YYYY","h:mm A – h:mm A","h:mm–h:mm A","h:mm–h:mm A","ddd D – ddd D MMM YYYY","ddd D MMM – ddd D MMM YYYY","ddd D MMM YYYY – ddd D MMM YYYY","Ah時mm分～Ah時mm分","Ah時mm分～h時mm分","Ah時mm分～h時mm分","H時mm分～H時mm分","YYYY年M月D日(ddd)～D日(ddd)","YYYY年M月D日(ddd)～M月D日(ddd)","YYYY年M月D日(ddd)～YYYY年M月D日(ddd)","h:mm A – h:mm A","h:mm–h:mm A","h:mm–h:mm A","ddd, D MMM – ddd, D MMM, YYYY","ddd, D MMM – ddd, D MMM, YYYY","ddd, D MMM, YYYY – ddd, D MMM, YYYY","h:mm A – h:mm A","h:mm – h:mm A","h:mm – h:mm A","ddd DD MMM YYYY – ddd DD MMM YYYY","ddd DD MMM YYYY – ddd DD MMM YYYY","ddd DD-MM-YYYY – ddd DD MMM YYYY","A h:mm ~ A h:mm","A h:mm~h:mm","A h:mm~h:mm","HH:mm ~ HH:mm","YYYY년 M월 D일 (ddd) ~ D일 (ddd)","YYYY년 M월 D일 (ddd) ~ M월 D일 (ddd)","YYYY년 M월 D일 (ddd) ~ YYYY년 M월 D일 (ddd)","h:mm A – h:mm A","h:mm–h:mm A","h:mm–h:mm A","ddd, D. – ddd, D. MMM YYYY","ddd, D. MMM – ddd, D. MMM YYYY","ddd, D. MMM YYYY – ddd, D. MMM YYYY","hh:mm A–hh:mm A","hh:mm–hh:mm A","hh:mm–hh:mm A","YYYY-MM-DD, ddd – YYYY-MM-DD, ddd","YYYY-MM-DD, ddd – YYYY-MM-DD, ddd","YYYY-MM-DD, ddd – YYYY-MM-DD, ddd","h:mm A – h:mm A","h:mm–h:mm A","h:mm–h:mm A","ddd, YYYY. 'gADA' D. MMM – ddd, YYYY. 'gADA' D. MMM","ddd, YYYY. 'gADA' D. MMM – ddd, YYYY. 'gADA' D. MMM","ddd, YYYY. 'gADA' D. MMM – ddd, YYYY. 'gADA' D. MMM","h:mm A – h:mm A","h:mm–h:mm A","h:mm–h:mm A","ddd, DD – ddd, DD MMM YYYY","ddd, DD MMM – ddd, DD MMM YYYY","ddd, DD MMM YYYY – ddd, DD MMM YYYY","h:mm A – h:mm A","h:mm – h:mm A","h:mm – h:mm A","YYYY MMM D, ddd – MMM D, ddd","YYYY MMM D, ddd – MMM D, ddd","YYYY MMM D, ddd – YYYY MMM D, ddd","h:mm A – h:mm A","h:mm – h:mm A","h:mm – h:mm A","ddd, D MMM YYYY – ddd, D MMM, YYYY","ddd, D MMM – ddd, D MMM, YYYY","ddd, D MMM, YYYY – ddd, D MMM, YYYY","h:mm A – h:mm A","h:mm–h:mm A","h:mm–h:mm A","ddd, D MMM – ddd, D MMM YYYY","ddd, D MMM – ddd, D MMM YYYY","ddd, D MMM YYYY – ddd, D MMM YYYY","h:mm A – h:mm A","h:mm–h:mm A","h:mm–h:mm A","D MMM၊ dddd – D MMM၊ YYYY၊ dddd","D MMM၊ dddd – D MMM၊ YYYY၊ dddd","D MMM၊ YYYY၊ dddd – D MMM၊ YYYY၊ dddd","h.mm A – h.mm A","h.mm–h.mm A","h.mm–h.mm A","ddd D.–ddd D. MMM YYYY","ddd D. MMM–ddd D. MMM YYYY","ddd D. MMM YYYY–ddd D. MMM YYYY","h:mm A – h:mm A","h:mm–h:mm A","h:mm–h:mm A","YYYY MMM D, ddd – MMM D, ddd","YYYY MMM D, ddd – MMM D, ddd","YYYY MMM D, ddd – YYYY MMM D, ddd","h:mm A – h:mm A","h:mm–h:mm A","h:mm–h:mm A","ddd D – ddd D MMM YYYY","ddd D MMM – ddd D MMM YYYY","ddd D MMM YYYY – ddd D MMM YYYY","h:mm–h:mm A","h:mm–h:mm A","ddd D.–ddd D. MMM YYYY","ddd D. MMM–ddd D. MMM YYYY","ddd D. MMM YYYY–ddd D. MMM","h:mm A – h:mm A","h:mm–h:mm A","h:mm–h:mm A","ddd, DD.MM.YYYY – ddd, DD.MM.YYYY","ddd, DD.MM.YYYY – ddd, DD.MM.YYYY","ddd, DD.MM.YYYY – ddd, DD.MM.YYYY","h:mm A – h:mm A","h:mm – h:mm A","h:mm – h:mm A","ddd, D – ddd, D 'De' MMM 'De' YYYY","ddd, D 'De' MMM – ddd, D 'De' MMM 'De' YYYY","ddd, D 'De' MMM 'De' YYYY – ddd, D 'De' MMM 'De' YYYY","h:mm A – h:mm A","h:mm – h:mm A","h:mm – h:mm A","ddd, D – ddd, D 'De' MMM 'De' YYYY","ddd, D 'De' MMM – ddd, D 'De' MMM 'De' YYYY","ddd, D 'De' MMM 'De' YYYY – ddd, D 'De' MMM 'De' YYYY","h:mm A – h:mm A","h:mm–h:mm A","h:mm–h:mm A","ddd, D MMM – ddd, D MMM YYYY","ddd, D MMM – ddd, D MMM YYYY","ddd, D MMM YYYY – ddd, D MMM YYYY","h:mm A – h:mm A","h:mm–h:mm A","h:mm–h:mm A","ccc, D – ccc, D MMM YYYY 'г'.","ccc, D MMM – ccc, D MMM YYYY 'г'.","ccc, D MMM YYYY – ccc, D MMM YYYY 'г'.","h:mm A – h:mm A","h:mm – h:mm A","h:mm – h:mm A","ddd, D. – ddd, D. MMM YYYY","ddd, D. MMM – ddd, D. MMM YYYY","ddd, D. MMM YYYY – ddd, D. MMM YYYY","h:mm A – h:mm A","h:mm–h:mm A","h:mm–h:mm A","ddd, D. MMM – ddd, D. MMM YYYY","ddd, D. MMM – ddd, D. MMM YYYY","ddd, D. MMM YYYY – ddd, D. MMM YYYY","h:mm A – h:mm A","h:mm – h:mm A","h:mm – h:mm A","ddd, D – ddd, D MMM YYYY","ddd, D MMM – ddd, D MMM YYYY","ddd, D MMM YYYY – ddd, D MMM YYYY","h.mm A – h.mm A","h.mm–h.mm A","h.mm–h.mm A","ddd, DD. – ddd, DD. MMM YYYY.","ddd, DD. MMM – ddd, DD. MMM YYYY.","ddd, DD. MMM YYYY. – ddd, DD. MMM YYYY.","h.mm A – h.mm A","h.mm–h.mm A","h.mm–h.mm A","ddd, DD. – ddd, DD. MMM YYYY.","ddd, DD. MMM – ddd, DD. MMM YYYY.","ddd, DD. MMM YYYY. – ddd, DD. MMM YYYY.","h:mm A – h:mm A","h:mm–h:mm A","h:mm–h:mm A","ddd DD MMM–ddd DD MMM YYYY","ddd DD MMM–ddd DD MMM YYYY","ddd DD MMM YYYY–ddd DD MMM YYYY","A h:mm – A h:mm","A h:mm–h:mm","A h:mm–h:mm","ddd, D MMM – ddd, D MMM, YYYY","ddd, D MMM – ddd, D MMM, YYYY","ddd, D MMM, YYYY – ddd, D MMM, YYYY","h:mm A – h:mm A","h:mm–h:mm A","h:mm–h:mm A","ddd D – ddd D MMM YYYY","ddd D MMM – ddd D MMM YYYY","ddd D MMM YYYY – ddd D MMM YYYY","h:mm A – h:mm A","h:mm–h:mm A","h:mm–h:mm A","YYYY MMM D, ddd – MMM D, ddd","YYYY MMM D, ddd – MMM D, ddd","YYYY MMM D, ddd – YYYY MMM D, ddd","A h:mm – A h:mm","A h:mm–h:mm","A h:mm–h:mm","D MMM YYYY ddd – D MMM YYYY ddd","D MMM YYYY ddd – D MMM YYYY ddd","D MMM YYYY ddd – D MMM YYYY ddd","h:mm A – h:mm A","h:mm–h:mm A","h:mm–h:mm A","YYYY MMM D, ddd – MMM D, ddd","YYYY MMM D, ddd – MMM D, ddd","YYYY MMM D, ddd – YYYY MMM D, ddd","h:mm A – h:mm A","h:mm–h:mm A","h:mm–h:mm A","YYYY MMM D, ddd – MMM D, ddd","YYYY MMM D, ddd – MMM D, ddd","YYYY MMM D, ddd – YYYY MMM D, ddd","h:mm A – h:mm A","h:mm–h:mm A","h:mm–h:mm A","ddd, D – ddd, D MMM YYYY","ddd, D MMM – ddd, D MMM YYYY","ddd, D MMM YYYY – ddd, D MMM YYYY","h:mm A – h:mm A","h:mm–h:mm A","h:mm–h:mm A","YYYY MMM D, ddd – MMM D, ddd","YYYY MMM D, ddd – MMM D, ddd","YYYY MMM D, ddd – YYYY MMM D, ddd","h:mm A – h:mm A","h:mm–h:mm A","h:mm–h:mm A","dddd, 'ngàYYYY' DD MMM – dddd, 'ngàYYYY' DD MMM 'năm' YYYY","ddd, DD 'tháng' M – ddd, DD 'tháng' M, YYYY","ddd, DD 'tháng' M, YYYY – ddd, DD 'tháng' M, YYYY","Ah:mm至Ah:mm","Ah:mm至h:mm","Ah:mm至h:mm","YYYY年M月D日ddd至D日ddd","YYYY年M月D日ddd至M月D日ddd","YYYY年M月D日ddd至YYYY年M月D日ddd","Ah:mm至Ah:mm","Ah:mm至h:mm","Ah:mm至h:mm","YYYY年M月D日ddd至D日ddd","YYYY年M月D日ddd至M月D日ddd","YYYY年M月D日ddd至YYYY年M月D日ddd","h:mm A – h:mm A","h:mm – h:mm A","h:mm – h:mm A","ddd, MMM D – ddd, MMM D, YYYY","ddd, MMM D – ddd, MMM D, YYYY","ddd, MMM D, YYYY – ddd, MMM D, YYYY"]};

    return moment;
}));