<div class="table-responsive">
<table class="table table-sm table-striped">
<thead class="fw-bold text-uppercase text-nowrap">
<tr>
<th>Middleware</th>
<th>Description</th>
<th>Auto-registered?</th>
</tr>
</thead>
<tbody>
{% for mw in include.middleware %}
<tr>
<td><code>{{ mw.name }}</code></td>
<td>{{ mw.desc }}</td>
<td>{{ mw.auto }}</td>
</tr>
{% endfor %}
</tbody>
</table>
</div>
