window.renderVerityAdhdPilotPage = function renderVerityAdhdPilotPage(main) {
  const page = document.createElement('div');
  page.className = 'condition-page';
  const wrapper = document.createElement('div');
  wrapper.className = 'container';

  const breadcrumb = document.createElement('nav');
  breadcrumb.className = 'breadcrumb';
  breadcrumb.setAttribute('aria-label', 'Breadcrumb');
  const back = document.createElement('a');
  back.className = 'breadcrumb__link';
  back.href = '#/conditions/adhd';
  back.textContent = '← ADHD overview';
  breadcrumb.append(back);
  wrapper.append(breadcrumb);

  const section = window.VerityResearch?.pilotSection?.();
  if (section) {
    const title = section.querySelector('h2');
    if (title) {
      const heading = document.createElement('h1');
      heading.id = title.id;
      heading.className = title.className;
      heading.textContent = title.textContent;
      title.replaceWith(heading);
    }
    wrapper.append(section);
  } else {
    const title = document.createElement('h1');
    title.className = 'display-lg';
    title.textContent = 'ADHD Research Representation';
    const note = document.createElement('p');
    note.textContent = 'The pilot files are unavailable in this checkout.';
    wrapper.append(title, note);
  }
  page.append(wrapper);
  main.replaceChildren(page);
};
