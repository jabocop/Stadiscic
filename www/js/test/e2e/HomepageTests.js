describe('home page', function () {
    beforeEach(function () {
        browser().navigateTo('/');
    });

    it('main menu is visible', function () {
        expect(element('#app_title').text()).toEqual('Stadiscisc');
    });

    it('should contain about button', function () {
        expect(element('#about_btn').text()).toContain('About');
    });

    it('should contain courses button', function () {
        expect(element('#courses_btn').text()).toContain('Courses');
    });

    it('should contain players button', function () {
        expect(element('#players_btn').text()).toContain('Players');
    });

    it('course button should open courses dialog', function () {
        element('#courses_btn').click();

        expect(element('#app_title').text()).toContain('Courses');
    });

    it('players button should open players dialog', function () {
        element('#players_btn').click();

        expect(element('#app_title').text()).toContain('Players');
    });

    it('new round button should open new round dialog - select course', function () {
        element('#new_round_btn').click();

        expect(element('#app_title').text()).toContain('Select course');
    });

    it('about button should open about dialog', function () {
        element('#about_btn').click();

        expect(element('#app_title').text()).toContain('About');
    });
});
