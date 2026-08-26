<div class="table-responsive{% if include.class %} {{ include.class }}{% endif %}">
<table class="table table-sm table-striped">
<thead class="fw-bold text-uppercase text-nowrap">
<tr>
<th>Route name</th>
<th>Method</th>
<th>Path</th>
<th>Purpose</th>
</tr>
</thead>
<tbody>
{% for route in include.routes %}
<tr><td><code>{{ route.name }}</code></td><td><code>{{ route.method }}</code></td><td><code>{{ route.path }}</code></td><td>{{ route.purpose }}</td></tr>
{% endfor %}
</tbody>
</table>
</div>
