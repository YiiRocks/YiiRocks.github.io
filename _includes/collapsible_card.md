<details class="card mb-3" name="{{ include.group }}">
<summary class="card-header d-flex justify-content-between align-items-center">
<{{ include.heading | default: "h3" }} id="{{ include.id }}" class="h5 mb-0 text-primary-emphasis">{{ include.title }}</{{ include.heading | default: "h3" }}>
</summary>
<div class="card-body" markdown="1">
{{ include.content }}
</div>
</details>
