var MailScript = MailScript || {};

const images = ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg'];
var messages = [
    {
        subject: "Meeting Reminder",
        from: "john.doe@example.com",
        to: "jane.smith@example.com",
        content: "Don't forget about the meeting at 3 PM.",
        createDate: new Date(),
        image: '3.jpg',
        status: 'inbox'
    },
    {
        subject: "Meeting",
        from: "jane.smith@example.com",
        to: "john.doe@example.com",
        content: "I will be there soon.",
        createDate: new Date(),
        image: '4.jpg',
        status: 'inbox'
    },
];

const dateFormatOption = { year: 'numeric', month: 'short', day: 'numeric' };

MailScript.init = function () {
    console.log("Final Exam Assignment - Version 1.0.0");
    MailScript.displayMessages(true);
    MailScript.displayIndividualMessages(0);
}

MailScript.displayMessages = function () {
    var inboxList = document.getElementById('inboxList');
    var sentList = document.getElementById('sentList');
    var draftList = document.getElementById('draftList');
    var trashList = document.getElementById('trashList');

    var headInboxList = document.getElementById('headingInbox');
    var headsentList = document.getElementById('headingSent');
    var headdraftList = document.getElementById('headingDrafts');
    var headtrashList = document.getElementById('headingTrash');

    inboxList.innerHTML = '';
    sentList.innerHTML = '';
    draftList.innerHTML = '';
    trashList.innerHTML = '';

    messages.forEach(function (message, index) {
        var listItem = document.createElement('li');
        listItem.classList.add('list-group-item');
        listItem.dataset.index = index;

        var fromDiv = document.createElement('div');
        fromDiv.classList.add('message-from-container');

        var imgElement = document.createElement('img');
        imgElement.src = `./images/${message.image}`;
        imgElement.classList.add('message-icon');
        fromDiv.appendChild(imgElement);

        var fromSpan = document.createElement('span');
        fromSpan.textContent = message.from;
        fromSpan.classList.add('message-from');
        fromDiv.appendChild(fromSpan);


        listItem.appendChild(fromDiv);

        var subjectElement = document.createElement('div');
        subjectElement.textContent = `Subject: ${message.subject}`;
        subjectElement.classList.add('message-subject');
        listItem.appendChild(subjectElement);

        var contentElement = document.createElement('div');
        var truncatedContent = message.content.slice(0, 150);
        contentElement.textContent = truncatedContent;
        contentElement.classList.add('message-content');
        listItem.appendChild(contentElement);

        listItem.addEventListener('click', function () {
            MailScript.displayIndividualMessages(this.dataset.index);
            document.getElementById('messageImage').src = `./images/${selectedMessage.image}`;
        });

        switch (message.status) {
            case 'inbox':
                inboxList.appendChild(listItem);
                break;
            case 'sent':
                sentList.appendChild(listItem);
                break;
            case 'draft':
                draftList.appendChild(listItem);
                break;
            case 'trash':
                trashList.appendChild(listItem);
                break;
        }
    });

    if (inboxList.children.length === 0) {
        var emptyItem = document.createElement('li');
        emptyItem.textContent = 'No items';
        emptyItem.classList.add('list-group-item', 'empty-item');
        inboxList.appendChild(emptyItem);
    }

    if (sentList.children.length === 0) {
        var emptyItem = document.createElement('li');
        emptyItem.textContent = 'No items';
        emptyItem.classList.add('list-group-item', 'empty-item');
        sentList.appendChild(emptyItem);
    }

    if (draftList.children.length === 0) {
        var emptyItem = document.createElement('li');
        emptyItem.textContent = 'No items';
        emptyItem.classList.add('list-group-item', 'empty-item');
        draftList.appendChild(emptyItem);
    }

    if (trashList.children.length === 0) {
        var emptyItem = document.createElement('li');
        emptyItem.textContent = 'No items';
        emptyItem.classList.add('list-group-item', 'empty-item');
        trashList.appendChild(emptyItem);
    }

    headInboxList.getElementsByClassName('count')[0].innerHTML = `(${messages.filter(x => x.status === 'inbox').length})`;
    headsentList.getElementsByClassName('count')[0].innerHTML = `(${messages.filter(x => x.status === 'sent').length})`;
    headdraftList.getElementsByClassName('count')[0].innerHTML = `(${messages.filter(x => x.status === 'draft').length})`;
    headtrashList.getElementsByClassName('count')[0].innerHTML = `(${messages.filter(x => x.status === 'trash').length})`;
}

MailScript.displayIndividualMessages = function (index) {

    var selectedMessage = messages[index];

    document.getElementById('messageImage').src = `./images/${selectedMessage.image}`;
    document.getElementById('messageSubject').textContent = `Subject: ${selectedMessage.subject}`;
    document.getElementById('messageFrom').textContent = selectedMessage.from;
    document.getElementById('messageDate').textContent = new Date(selectedMessage.createDate).toLocaleDateString('en-US', dateFormatOption);
    document.getElementById('messageContent').textContent = selectedMessage.content;

    document.getElementById('messageDetails').style.display = 'block';

    MailScript.visibleDrawer(false);

}


MailScript.addOrEdit = function () {

    if (MailScript.validateForm() === true) {
        const date = new Date();

        var mailData = {
            id: new Date().getTime(),
            to: document.getElementById('mailTo').value,
            from: document.getElementById('mailFrom').value,
            subject: document.getElementById('mailSubject').value,
            content: document.getElementById('mailContent').value,
            createDate: date.toLocaleDateString('en-US', dateFormatOption),
            image: images[Math.floor(Math.random() * images.length)],
            status: 'inbox'
        };

        messages.push(mailData);
        MailScript.closeModalMessageManual();
        MailScript.showMessage();

        MailScript.displayMessages();
    }

    document.getElementById('mailForm').reset();

}

MailScript.changeStatus = function () {
}

MailScript.remove = function () {
}


MailScript.validateForm = function () {
    var mailTo = document.getElementById('mailTo');
    var mailFrom = document.getElementById('mailFrom');
    var mailSubject = document.getElementById('mailSubject');
    var mailContent = document.getElementById('mailContent');

    var inputs = [mailTo, mailFrom, mailSubject, mailContent];
    inputs.forEach(input => {
        input.classList.remove('is-invalid');
        var feedback = input.nextElementSibling;
        if (feedback) {
            feedback.style.display = 'none';
        }
    });

    var isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.classList.add('is-invalid');
            var feedback = input.nextElementSibling;
            if (feedback) {
                feedback.style.display = 'block';
            }
            isValid = false;
        }
    });


    return isValid;
}

MailScript.showMessage = function () {
    var toastElement = document.getElementById('successToast');
    var toast = new bootstrap.Toast(toastElement, { delay: 5000 });
    toast.show();
}

MailScript.closeModalMessageManual = function () {

    var body = document.getElementsByTagName('body')[0];
    body.classList.remove('modal-open');
    body.style.cssText = '';

    var mailModal = document.getElementById('mailModal');
    mailModal.classList.remove('show');
    mailModal.style.display = 'none';

    var mailModalBackDrop = document.getElementsByClassName('modal-backdrop')[0];
    mailModalBackDrop.remove();
}

MailScript.visibleDrawer = function (show = false) {

    const drawer = document.getElementById("drawer");

    if (show) {
        drawer.classList.add('show');
    }
    else {
        drawer.classList.remove('show');
    }
}

window.onload = function () {
    MailScript.init();
};
