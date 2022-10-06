const AddNoteScreen = require("../screenobjects/android/add-note.screen");

describe('Add Notes | ', () => {
    it('- Skip tutorial', async () => {
        // find element and click on it
        //- await $('//*[@resource-id="com.socialnmobile.dictapps.notepad.color.note:id/btn_start_skip"]').click();
        await AddNoteScreen.skipBtn.click();

        // assertion
        //- await expect($('//*[@text="Add note"]')).toBeDisplayed();
        await expect(AddNoteScreen.addNoteTxt).toBeDisplayed();
    });

    it('- Add note, save changes and verify note', async () => {
        // find element and click on it
        //- await $('//*[@text="Add note"]').click();
        await AddNoteScreen.addNoteTxt.click();
        //- await $('//*[@text="Text"]').click();
        await AddNoteScreen.textOption.click();

        // assertion
        //- await expect($('//*[@text="Editing"]')).toBeDisplayed();
        await AddNoteScreen.textEditing.click();

        // add note title
        //- const noteTitle = await $('//*[@resource-id="com.socialnmobile.dictapps.notepad.color.note:id/edit_title"]');
        const noteTitle = AddNoteScreen.noteHeading;
        await noteTitle.setValue('Fav Anime List');

        // add note body
        //- await $('//*[@resource-id="com.socialnmobile.dictapps.notepad.color.note:id/edit_note"]')
        //-     .addValue('Naruto\nOnePiece\nAOT');
        await AddNoteScreen.noteBody.addValue('Naruto\nOnePiece\nAOT');

        // save changes
        //- await driver.back();
        //- await driver.back();
        await AddNoteScreen.saveNote();

        // assert that edit button is on the screen
        //- await expect($('//*[@resource-id="com.socialnmobile.dictapps.notepad.color.note:id/edit_btn"]'))
        //-     .toBeDisplayed();
        await expect(AddNoteScreen.editBtn).toBeDisplayed();
        //- await expect($('//*[@resource-id="com.socialnmobile.dictapps.notepad.color.note:id/view_note"]'))
        //-     .toHaveText('Naruto\nOnePiece\nAOT');
        await expect(AddNoteScreen.viewNote).toHaveText('Naruto\nOnePiece\nAOT');
    });

    it('Delete a note & check the note in trash can', async () => {
        // go back (to the notes' list)
        await driver.back();

        // find a note
        const note = await $('//*[@resource-id="com.socialnmobile.dictapps.notepad.color.note:id/title"]')
            .getText();

        // click on the note
        await $('//*[@resource-id="com.socialnmobile.dictapps.notepad.color.note:id/title"]').click();

        // click on More icon
        await $('~More').click();

        // click on Delete item
        await $('//*[@text="Delete"]').click();

        // confirm delete operation
        await driver.acceptAlert();

        // click on Nav icon
        await $('//*[@resource-id="com.socialnmobile.dictapps.notepad.color.note:id/icon_nav"]').click();

        // click on Trash Can item
        await $('//*[@text="Trash Can"]').click();

        // assertions
        // const trashCanItem = await $('//*[@resource-id="com.socialnmobile.dictapps.notepad.color.note:id/title"]')
        //     .getText();
        // await expect(trashCanItem).toEqual(note);

        const trashCanItem = await $('//*[@resource-id="com.socialnmobile.dictapps.notepad.color.note:id/title"]');
        await expect(trashCanItem).toHaveText(note);


        // pause
        await driver.pause(3000);
    });
});