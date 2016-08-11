import { DffDraftPage } from './app.po';

describe('dff-draft App', function() {
  let page: DffDraftPage;

  beforeEach(() => {
    page = new DffDraftPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
