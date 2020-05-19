const ComponentsService = {
    getAllComponents(knex) {
        return knex
        .select('*')
        .from('Componentful_Components')
    },
    insertComponent(knex, newComponent) {
        return knex
        .insert(newComponent)
        .into('Componentful_Components')
        .returning('*')
        .then(rows => {
            return rows[0]
        })
    },
    getbyId(knex, id) {
        return knex
        .from('Componentful_Components')
        .select('*')
        .where('id', id)
        .first()
    },
    deleteComponent(knex, id) {
        return knex('Componentful_Components')
        .where({ id })
        .delete()
    },
    updateComponent(knex, id, newComponentFields) {
        return knex('Componentful_Components')
        .where({ id })
        .update(newComponentFields)
    },
}

module.exports = ComponentsService;