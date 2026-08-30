<div class="table-responsive" markdown="1">
| Middleware | Description | Auto-registered? |
| --- | --- | --- |
{%- for mw in include.middleware %}
| `{{ mw.name }}` | {{ mw.desc }} | {{ mw.auto }} |
{%- endfor %}
{: .table .table-sm .table-striped }
</div>
