(function () {
  var content = [{"context":[{"title":"介绍","link":"/index.html"}],"content":"\n        <h3 id=\"此文档主要用于学习记录\">\n            <a href='#此文档主要用于学习记录' class='header-anchor'>#</a>\n            <span>此文档主要用于学习记录</span>\n        </h3>\n    <p>最近修改于2020年03月23日<br>github地址：<a href=\"https://github.com/lisniuse/teadocs\">https://github.com/lisniuse/teadocs</a></p>\n"},{"context":[{"title":"大前端","link":"javascript:void(0)"},{"title":"react","link":"javascript:void(0)"},{"title":"react-hooks","link":"/front/react/react-hooks.html"}],"content":"\n        <h3 id=\"react-hooks\">\n            <a href='#react-hooks' class='header-anchor'>#</a>\n            <span>react-hooks</span>\n        </h3>\n    <pre class=\"prettyprint\"><code>react hooks详解</code></pre>"},{"context":[{"title":"大前端","link":"javascript:void(0)"},{"title":"vue","link":"javascript:void(0)"},{"title":"vue工程","link":"/front/vue/project.html"}],"content":"\n        <h1 id=\"vue工程\">\n            <a href='#vue工程' class='header-anchor'>#</a>\n            <span>vue工程</span>\n        </h1>\n    "},{"context":[{"title":"数据库","link":"javascript:void(0)"},{"title":"mysql","link":"/database/mysql.html"}],"content":"\n        <h1 id=\"mysql\">\n            <a href='#mysql' class='header-anchor'>#</a>\n            <span>mysql</span>\n        </h1>\n    "}];

  var escapeHtml = function (html) {
    let str = html;
    str = str.replace(/&/g, '&amp;');
    str = str.replace(/</g, '&lt;');
    str = str.replace(/>/g, '&gt;');
    str = str.replace(/"/g, '&quot;');
    str = str.replace(/'/g, '&#039;');
    return str;
  }

  var clearHtml = function (html) {
    let str = html;
    str = str.replace(/&amp;/g, '');
    str = str.replace(/&lt;/g, '');
    str = str.replace(/&gt;/g, '');
    str = str.replace(/&quot;/g, '');
    str = str.replace(/&#039;/g, '');
    return str;
  }

  var randStr = function () {
    return Math.random().toString(36).substr(2);
  };

  var findTitle = function (ele) {
    var findPrevs = function (ele) {
      var children = $(ele).parent().children();
      var prevs = [];
      var findIt = false;
      children = Array.prototype.slice.call(children);
      children.forEach(function (subEle) {
        if ($(subEle).is($(ele))) {
          findIt = true;
        }
        if (findIt === false && $(subEle).text() != "") {
          prevs.push(subEle);
        }
      });
      return prevs;
    };

    var findH = function (eles) {
      var _eles = Array.prototype.slice.call(eles);
      _eles.reverse();
      var title = "";
      var id = "";
      _eles.forEach(function (item) {
        if (!title) {
          if (item.nodeName[0] === "H") {
            title = $(item).text();
            id = $(item).attr("id");
          }
        }
      });
      return {
        text: title,
        id: id
      };
    };
    var prevs = findPrevs(ele);
    if (prevs.length) {
      return findH(prevs);
    }
  };

  window.searchData = function (keyword) {
    var searchResult = [];
    content.forEach(function (item, index) {
      var tempHtml = "<div id='" + randStr() + "'></div>";
      var tempEle = $(tempHtml);
      var findArray = [];
      tempEle.html(clearHtml(item.content));
      findArray = tempEle.find(":contains('" + keyword + "')");
      findArray = Array.prototype.slice.call(findArray);
      if (findArray.length) {
        findArray.forEach(function (ele) {
          var findContent = $(ele).text();
          findContent = findContent[0] === "<" ? $(findContent).text() : findContent;
          findContent = escapeHtml(findContent);
          findContent = findContent.replace(new RegExp(keyword, 'g'), "<b>" + keyword + "</b>");
          var hObj = findTitle(ele);
          if (hObj) {
            searchResult.push({
              context: item.context,
              title: hObj.text,
              hid: hObj.id,
              findContent: findContent
            });
          }
        });
      }
    });
    return searchResult;
  };
})();