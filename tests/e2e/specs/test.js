// For authoring Nightwatch tests, see
// https://nightwatchjs.org/guide

module.exports = {
  "Agendas e2e Test": browser => {
    browser
      .init()
      .waitForElementVisible("#home")
      .click("#home-btn-addAgenda")
      .pause(3000)
      //.assert.elementPresent("#CTA-Name")
      .setValue("input[id=CTA-Name]", "Agenda-Prueba")
      .pause(3000)
      .setValue("input[id=CTA-BeginH]", "10:10:00")
      .pause(3000)
      .setValue("input[id=CTA-EndH]", "11:00:00")
      .pause(3000)
      .setValue("input[id=CTA-Desc]", "Esto es una prueba")
      .click("#CTA-btn-Create")
      .pause(3000)
      .end();
  }
};
