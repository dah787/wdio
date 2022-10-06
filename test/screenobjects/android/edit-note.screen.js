const AddNoteScreen = require("./add-note.screen");

class EditNoteScreen {
    get firstNote() {
        return $('//*[@resource-id="com.socialnmobile.dictapps.notepad.color.note:id/title"]');
    }
    get moreIcon() {
        return $('~More');
    }
    get deleteIcon() {
        return $('//*[@text="Delete"]');
    }
    get navIcon() {
        return $('//*[@resource-id="com.socialnmobile.dictapps.notepad.color.note:id/icon_nav"]');
    }
    get trashCanItem() {
        return $('//*[@text="Trash Can"]');
    }


    async skipTutorial() {
        // find element and click on it
        await AddNoteScreen.skipBtn.click();

        // assertion
        await expect(AddNoteScreen.addNoteTxt).toBeDisplayed();
    }
    async addAndSaveNote(noteHeading, noteBody) {
        // find element and click on it
        await AddNoteScreen.addNoteTxt.click();
        await AddNoteScreen.textOption.click();

        // assertion
        await AddNoteScreen.textEditing.click();

        // add note title
        const noteTitle = AddNoteScreen.noteHeading;
        await noteTitle.setValue(noteHeading); // .setValue('Fav Anime List')

        // add note body
        await AddNoteScreen.noteBody.addValue(noteBody); // .addValue('Naruto\nOnePiece\nAOT')

        // save changes
        await AddNoteScreen.saveNote();

        // assert that edit button is on the screen
        await expect(AddNoteScreen.editBtn).toBeDisplayed();
        await expect(AddNoteScreen.viewNote).toHaveText(noteBody); // .toHaveText('Naruto\nOnePiece\nAOT')
    }
}

// module.exports = new EditNoteScreen();
export default new EditNoteScreen(); // - modern way to export: added on 04.10.2022 after Babel installation