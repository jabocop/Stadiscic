/// <reference path='_all_e2etests.d.ts' />

describe('home page', () => {
    beforeEach(() => {
        browser().navigateTo('/')
    });
    
    it('main menu is visible', () => {
        expect(element('#app_title').text()).toEqual('Stadiscisc');
    });

    it('should contain about button', () => {
        expect(element('#about_btn').text()).toContain('About');

    });

    it('should contain courses button', () => {
        expect(element('#courses_btn').text()).toContain('Courses');

    });

    it('should contain players button', () => {
        expect(element('#players_btn').text()).toContain('Players');

    });

    it('course button should open courses dialog', () => {
        element('#courses_btn').click();

        expect(element('#app_title').text()).toContain('Courses');

    });

    it('players button should open players dialog', () => {
        element('#players_btn').click();

        expect(element('#app_title').text()).toContain('Players');

    });

    it('new round button should open new round dialog - select course', () => {
        element('#new_round_btn').click();

        expect(element('#app_title').text()).toContain('Select course');

    });

    

    it('about button should open about dialog', () => {
        element('#about_btn').click();

        expect(element('#app_title').text()).toContain('About');

    });

});

