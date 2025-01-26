function alertButton()
{
    alert("Hello There! \nWelcome to my website. \nI am holding a rock crab.")
}

function NewTab(filepath)
{
    window.open(filepath, '_blank')
}

function ScrollTo_SECTION(sectionID, str_sectionID) {
    document.getElementById(str_sectionID).scrollIntoView({ behavior: 'smooth' });
}