<div class="pull-left">
  <% if (obj.draft) { %>
  <a href="#info" class="icon icon-menu"></a>
  <a href="#samples" class="icon icon-user"></a>
  <% } else {%>
  <a data-rel="back" class="icon icon-left-nav"></a>
  <% } %>
</div>
<div class="pull-right">
  <button  id="sample-save-btn"
           class="icon <%- obj.isSynchronising ? 'icon-plus icon-spin disabled' : 'icon-send' %>">Send</button>
</div>
