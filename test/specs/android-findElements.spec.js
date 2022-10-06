describe('Android Elements Tests / ', () => {
    it('Find element by accessibility id', async () => {
        // find element by accessibility id
        const appOption = await $('~App');

        // click on element
        await appOption.click();

        // assertion
        const actionBar = await $('~Action Bar');
        await expect(actionBar).toBeExisting();
    });

    it('Find element by class name', async () => {
        // find element by class name
        const className = await $('android.widget.TextView');

        // click on element
        console.log('Current class is ' + await className.getText());

        // assertion
        await expect(className).toHaveText('API Demos');
    });

    xit('Find element by Xpath', async () => {
        // find element by Xpath = //tagname[@attribute=value], where:
        // tagname - class, attribute - text, content description, resource ID, ...
        // find element by Xpath with content description
        await $('//android.widget.TextView[@content-desc="Alert Dialogs"]').click();

        // find element by Xpath with resource ID
        await $('//android.widget.Button[@resource-id="io.appium.android.apis:id/select_button"]').click();

        // find element by Xpath with text
        await $('//android.widget.TextView[@text="Command two"]').click();

        // find element by Xpath with tagname/class ONLY
        const textAssertion = await $('//android.widget.TextView'); // double slash can be omitted
        
        // assertion
        await expect(textAssertion).toHaveText("You selected: 1 , Command two");
    });

    it('Find element by UiAutomator', async () => {
        // find element by textContains
        await $('android=new UiSelector().textContains("Alert")').click();
    });

    it('Find multiple elements', async () => {
        const expectedList = [
            "API Demos", "Access'ibility", "Accessibility", "Animation", "App",
            "Content", "Graphics", "Media", "NFC", "OS", "Preference", "Text", "Views"
        ];
        const actualList = [];

        // find multiple elements
        const textList = await $$('android.widget.TextView');

        // loop through them
        for (const element of textList) {
                let elementValue = await element.getText();
                // console.table(elementValue);
            actualList.push(elementValue);
        }

        // assert the list
        await expect(actualList).toEqual(expectedList);
    });

    it.only('Working with text field', async () => {
        const expectedText = 'Canada';

        // access the auto complete screen (find elements and click them)
        await $('~Views').click();
        await $('//*[@text="Auto Complete"]').click();
        await $('//android.widget.TextView[@content-desc="1. Screen Top"]').click();

        // enter the country name
        const textField = await $('//*[@resource-id="io.appium.android.apis:id/edit"]');
        await textField.addValue('Canada');

        // verify the country name
        await expect(textField).toHaveText(expectedText);
    });
});