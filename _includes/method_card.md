<div class="col-12">
    <div class="card h-100">
        <div class="card-header d-flex align-items-center"><div class="me-2 d-flex align-items-center justify-content-center flex-shrink-0 rounded-3" style="background:{{ include.tint }}; width:32px; height:32px;"><img width="20" height="20" src="{{ include.icon }}" alt="{{ include.label }}"></div>{{ include.label }}</div>
        <div class="card-body">
            <p class="card-text">
                {{ include.text }}
            </p>
            {% include route_table.md routes=include.routes class="mb-0" %}
        </div>
        <div class="card-footer">
            {% include install_block.md package=include.package repo=include.repo class="mb-0" %}
        </div>
    </div>
</div>
