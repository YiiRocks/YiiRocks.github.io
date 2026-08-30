<div class="table-responsive{% if include.class %} {{ include.class }}{% endif %}" markdown="1">
| Route name | Method | Path | Purpose |
| --- | --- | --- | --- |
{%- for route in include.routes %}
| `{{ route.name }}` | `{{ route.method }}` | `{{ route.path }}` | {{ route.purpose }} |
{%- endfor %}
{: .table .table-sm .table-striped }
</div>
