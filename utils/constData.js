const events = ['Вход систему', 'Входящий звонок', 'Исходящий звонок', 'Клиент поздравлен с днем рождения', 'Отправлен подарочный купон', ]

const endActionsScenarioList = ['Повторный звонок через', 'Смена статуса', 'Удаляем из базы' ]

const moduleScenarioList = ['Текст', 'Текст с заголовком', 'Чек-лист', 'Комментарий', 'Выпадающий список', 'Оценка сотрудника', 'Ссылка на регистрацию', 'Отправка купона', 'Смена специалиста' ]

const typeScenarioList = [{name: 'Неуспешные клиенты', number: 0, color: '#DF5C3A'},{name: 'Закрытые клиенты', number: 1, color: '#72BE3D'},]

module.exports = {
    events, endActionsScenarioList, moduleScenarioList, typeScenarioList
}