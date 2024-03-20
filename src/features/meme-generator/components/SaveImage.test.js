import { collectMemeInfo } from './SaveImage';

it('collect meme info', () => {
    jest
        .spyOn(global, 'Date')
        .mockImplementationOnce(() => new Date('2019-05-14T11:01:58.135Z'));

    expect(
        collectMemeInfo("title1", "context1", "imgName1", "userId1", ["tag1", "tag2"], true, ["term1", "term2"])
    ).toEqual(
        {
            title: "title1",
            context: "context1",
            img_name: "imgName1",
            owner_user_id: "userId1",
            tags: ["tag1", "tag2"],
            isPublic: true,
            created_time: new Date('2019-05-14T11:01:58.135Z'),
            last_save_time: new Date('2019-05-14T11:01:58.135Z'),
            click_time: 0,
            search_array_term: ["term1", "term2"]
        }
    );

    expect(
        collectMemeInfo("title2", "", "imgName2", "userId2", [""], false, [""])
    ).toEqual(
        {
            title: "title2",
            context: "",
            img_name: "imgName2",
            owner_user_id: "userId2",
            tags: [""],
            isPublic: false,
            created_time: new Date('2019-05-14T11:01:58.135Z'),
            last_save_time: new Date('2019-05-14T11:01:58.135Z'),
            click_time: 0,
            search_array_term: [""]
        }
    );
})