<div class="info-message">
  <p style="text-align: left;">What activities were you doing?</p>
</div>

<ul class="list">
  <% obj.selection.forEach((option) => { %>
  <li class="item item-checkbox item-small">
    <label class="checkbox">
      <input type="checkbox" class="personal" value="<%= option %>" <%- obj.selected.personal.indexOf(option) >= 0 ? 'checked' : ''%>>
    </label>
    <%= option %>
  </li>
  <% }) %>
</ul>

<div class="info-message">
  <p style="text-align: left;">What activities are done at this location?</p>
</div>
<ul class="list">
  <% obj.selection.forEach((option) => { %>
  <li class="item item-checkbox item-small">
    <label class="checkbox">
      <input type="checkbox" class="others" value="<%= option %>" <%- obj.selected.others.indexOf(option) >= 0 ? 'checked' : ''%>>
    </label>
    <%= option %>
  </li>
  <% }) %>
</ul>