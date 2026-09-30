import { VocabularyItem, LiteraryDeviceItem, PoetryHook } from '../types';

export const VOCABULARY_LIST: VocabularyItem[] = [
  // 1. Mặt nước & Dòng chảy
  {
    id: 'v1',
    word: 'phẳng lặng',
    category: 'water',
    type: 'Từ láy',
    meaning: 'Yên tĩnh, không có sóng to gió lớn, mặt nước êm như gương',
    exampleSentence: 'Sáng sớm, mặt hồ phẳng lặng như một tấm gương khổng lồ soi bóng mây trời.',
    scenes: ['hồ', 'ao', 'sông']
  },
  {
    id: 'v2',
    word: 'lăn tăn',
    category: 'water',
    type: 'Từ láy',
    meaning: 'Những gợn sóng rất nhỏ nối tiếp nhau xao động trên mặt nước',
    exampleSentence: 'Từng làn gió nhẹ thổi qua làm mặt sông gợn lên những làn sóng lăn tăn óng ánh.',
    scenes: ['sông', 'hồ', 'ao', 'suối']
  },
  {
    id: 'v3',
    word: 'lấp loáng',
    category: 'water',
    type: 'Từ láy',
    meaning: 'Ánh sáng phản chiếu lung linh, lúc ẩn lúc hiện trên sóng nước',
    exampleSentence: 'Ánh nắng ban mai rọi xuống khiến dòng suối lấp loáng như dát vàng dát bạc.',
    scenes: ['sông', 'suối', 'hồ', 'biển']
  },
  {
    id: 'v4',
    word: 'dập dềnh',
    category: 'water',
    type: 'Từ láy',
    meaning: 'Lên xuống nhịp nhàng, êm ái theo nhịp sóng nước',
    exampleSentence: 'Những khóm hoa lục bình tím biếc dập dềnh theo từng con sóng nhỏ trôi về xuôi.',
    scenes: ['sông', 'hồ', 'biển']
  },
  {
    id: 'v5',
    word: 'đỏ quạch',
    category: 'water',
    type: 'Tính từ',
    meaning: 'Màu đỏ sẫm đặc sánh của phù sa màu mỡ trong mùa mưa lũ',
    exampleSentence: 'Vào mùa lũ, dòng sông Hồng đỏ quạch phù sa, cuồn cuộn chảy như dòng sữa mẹ nuôi dưỡng cánh đồng.',
    scenes: ['sông']
  },
  {
    id: 'v6',
    word: 'biếc ngọc',
    category: 'water',
    type: 'Từ ghép',
    meaning: 'Màu xanh trong veo, sâu thẳm và quý giá như ngọc bích',
    exampleSentence: 'Nước biển mùa hè trong xanh biếc ngọc, nhìn thấu tận những rạn san hô dưới đáy cát.',
    scenes: ['biển', 'suối', 'hồ']
  },
  {
    id: 'v7',
    word: 'cuồn cuộn',
    category: 'water',
    type: 'Từ láy',
    meaning: 'Sức nước chảy mạnh mẽ, lớp lớp dâng tràn liên tiếp',
    exampleSentence: 'Sau cơn mưa rừng, con suối cuồn cuộn dòng nước trắng xóa vượt qua ghềnh đá.',
    scenes: ['sông', 'suối']
  },
  {
    id: 'v8',
    word: 'lững lờ',
    category: 'water',
    type: 'Từ láy',
    meaning: 'Chuyển động chầm chậm, nhẹ nhàng, dường như không vội vã',
    exampleSentence: 'Dòng sông Hương êm đềm lững lờ trôi qua thành phố cổ kính như một khúc tình ca.',
    scenes: ['sông', 'hồ']
  },

  // 2. Ánh sáng & Bầu trời
  {
    id: 'v9',
    word: 'dát vàng',
    category: 'light',
    type: 'Từ ghép',
    meaning: 'Ánh sáng rực rỡ chiếu xuống làm mọi vật bừng lên màu vàng óng quý phái',
    exampleSentence: 'Hoàng hôn buông xuống, vầng thái dương dát vàng lên từng con sóng biển dạt dào.',
    scenes: ['biển', 'sông', 'hồ']
  },
  {
    id: 'v10',
    word: 'lung linh',
    category: 'light',
    type: 'Từ láy',
    meaning: 'Ánh sáng rung rinh, đổi màu và phản chiếu huyền ảo',
    exampleSentence: 'Đêm về, ánh đèn hai bên bờ phản chiếu xuống mặt sông lung linh như ngàn vạn vì sao sa.',
    scenes: ['sông', 'hồ', 'biển']
  },
  {
    id: 'v11',
    word: 'bàng bạc',
    category: 'light',
    type: 'Từ láy',
    meaning: 'Màu trắng ngà mờ ảo của sương mai hoặc ánh trăng hòa cùng làn khói nước',
    exampleSentence: 'Sáng sớm, mặt hồ Ba Bể phủ một làn sương mỏng manh bàng bạc tựa chốn bồng lai.',
    scenes: ['hồ', 'sông', 'suối']
  },
  {
    id: 'v12',
    word: 'vàng ươm',
    category: 'light',
    type: 'Tính từ',
    meaning: 'Màu vàng đậm đà, tươi tắn và ấm áp của nắng mới',
    exampleSentence: 'Từng vệt nắng vàng ươm xuyên qua kẽ lá, nhảy múa trên mặt nước mát rượi.',
    scenes: ['suối', 'ao', 'sông']
  },

  // 3. Âm thanh đắt giá
  {
    id: 'v13',
    word: 'róc rách',
    category: 'sound',
    type: 'Từ tượng thanh',
    meaning: 'Tiếng nước chảy luồn lách qua khe đá nhỏ khe khẽ, liên tục và vui tai',
    exampleSentence: 'Tiếng suối chảy róc rách trong khe đá như khúc nhạc vui đón chào ngày mới của núi rừng.',
    scenes: ['suối']
  },
  {
    id: 'v14',
    word: 'rì rào',
    category: 'sound',
    type: 'Từ tượng thanh',
    meaning: 'Âm thanh êm dịu, nhỏ nhẹ của gió thổi qua rặng cây hoặc sóng vỗ đều đặn',
    exampleSentence: 'Hàng phi lao ven bờ biển ngày đêm cất tiếng rì rào trò chuyện cùng ngọn gió.',
    scenes: ['biển', 'sông', 'hồ']
  },
  {
    id: 'v15',
    word: 'ì ầm',
    category: 'sound',
    type: 'Từ tượng thanh',
    meaning: 'Tiếng sóng lớn từ xa dội vào bờ, vang dội và trầm hùng',
    exampleSentence: 'Từ xa, tiếng sóng biển vỗ vào vách đá nghe ì ầm như tiếng gầm của đại dương bao la.',
    scenes: ['biển']
  },
  {
    id: 'v16',
    word: 'lao xao',
    category: 'sound',
    type: 'Từ tượng thanh',
    meaning: 'Nhiều âm thanh nhỏ rộn rã lẫn vào nhau, gợi sự sống động',
    exampleSentence: 'Tiếng cá quẫy đuôi đớp mồi lao xao dưới gốc bèo làm vỡ tan sự yên tĩnh của buổi sớm.',
    scenes: ['ao', 'hồ', 'sông']
  },
  {
    id: 'v17',
    word: 'râm ran',
    category: 'sound',
    type: 'Từ tượng thanh',
    meaning: 'Âm thanh rộn rã kéo dài từ nhiều phía cùng hòa nhịp',
    exampleSentence: 'Tiếng ve sầu râm ran trên những rặng bằng lăng ven hồ báo hiệu mùa hè đã gõ cửa.',
    scenes: ['hồ', 'sông']
  },

  // 4. Cây cối & Đôi bờ
  {
    id: 'v18',
    word: 'soi bóng',
    category: 'trees',
    type: 'Từ ghép',
    meaning: 'Hình ảnh cây cối in bóng rõ nét, duyên dáng xuống làn nước trong',
    exampleSentence: 'Những rặng tre già nghiêng mình soi bóng xuống dòng sông quê như đang chải tóc.',
    scenes: ['sông', 'ao', 'hồ']
  },
  {
    id: 'v19',
    word: 'xanh mướt',
    category: 'trees',
    type: 'Tính từ',
    meaning: 'Màu xanh tươi non, tràn đầy nhựa sống và mỡ màng',
    exampleSentence: 'Hai bên bờ sông là những bãi ngô xanh mướt trải dài tít tắp đến tận chân trời.',
    scenes: ['sông', 'hồ']
  },
  {
    id: 'v20',
    word: 'trù phú',
    category: 'trees',
    type: 'Tính từ',
    meaning: 'Đất đai màu mỡ, cây trái xanh tốt, cuộc sống ấm no',
    exampleSentence: 'Dòng sông mang nặng phù sa đã làm nên những xóm làng trù phú đôi bờ ngút ngát hoa trái.',
    scenes: ['sông']
  },

  // 5. Cảm giác, Khứu giác & Xúc giác (5 giác quan)
  {
    id: 'v21',
    word: 'thoang thoảng',
    category: 'scent_touch',
    type: 'Từ láy',
    meaning: 'Mùi hương nhẹ nhàng, phảng phất bay trong làn gió',
    exampleSentence: 'Gió chiều mang theo mùi hương sen thoang thoảng từ đầm nước làm lòng người lâng lâng.',
    scenes: ['ao', 'hồ', 'sông']
  },
  {
    id: 'v22',
    word: 'ngai ngái',
    category: 'scent_touch',
    type: 'Từ láy',
    meaning: 'Mùi đất phù sa hoặc mùi bùn non đặc trưng rất gần gũi của miền quê',
    exampleSentence: 'Mùi bùn non ngai ngái bốc lên sau trận mưa hè khiến em nhớ da diết những buổi chăn trâu tắm sông.',
    scenes: ['sông', 'ao']
  },
  {
    id: 'v23',
    word: 'mát rượi',
    category: 'scent_touch',
    type: 'Tính từ',
    meaning: 'Cảm giác mát mẻ sảng khoái lan tỏa khắp cơ thể',
    exampleSentence: 'Nhúng đôi bàn chân nhỏ xuống dòng suối trong vắt, cảm giác mát rượi xua tan đi bao mệt mỏi.',
    scenes: ['suối', 'sông', 'biển', 'hồ']
  },
  {
    id: 'v24',
    word: 'mằn mặn',
    category: 'scent_touch',
    type: 'Từ láy',
    meaning: 'Vị mặn nhè nhẹ của gió biển phả vào môi và da thịt',
    exampleSentence: 'Hít căng lồng ngực hương gió biển mằn mặn nồng nàn, em cảm nhận trọn vẹn vị mặn mòi của quê hương.',
    scenes: ['biển']
  },

  // 6. Cảm xúc & Tâm trạng
  {
    id: 'v25',
    word: 'bồi hồi',
    category: 'emotion',
    type: 'Từ láy',
    meaning: 'Cảm xúc xao động, nhớ nhung tha thiết dâng trào trong lòng',
    exampleSentence: 'Mỗi khi đứng trước dòng sông tuổi thơ, lòng em lại bồi hồi nhớ về những ngày tháng êm đềm bên bè bạn.',
    scenes: ['sông', 'biển', 'hồ', 'suối', 'ao']
  },
  {
    id: 'v26',
    word: 'thanh bình',
    category: 'emotion',
    type: 'Tính từ',
    meaning: 'Cảnh sắc êm ả, yên vui, không có ồn ào hỗn tạp',
    exampleSentence: 'Khung cảnh mặt hồ buổi sớm mai thật thanh bình, khiến mọi âu lo dường như tan biến hết.',
    scenes: ['hồ', 'sông', 'ao']
  },
  {
    id: 'v27',
    word: 'gắn bó',
    category: 'emotion',
    type: 'Từ ghép',
    meaning: 'Tình cảm keo sơn, mật thiết không nỡ rời xa',
    exampleSentence: 'Dòng sông quê hương đã gắn bó với tuổi thơ em qua biết bao kỷ niệm thả diều, tắm mát.',
    scenes: ['sông', 'hồ', 'biển', 'suối', 'ao']
  }
];

export const LITERARY_DEVICES: LiteraryDeviceItem[] = [
  // So sánh
  {
    id: 'ld1',
    type: 'so_sanh',
    target: 'Dòng sông',
    phrase: 'Dòng sông uốn lượn như một dải lụa đào mềm mại vắt ngang qua cánh đồng lúa chín vàng.',
    explanation: 'So sánh dòng sông với dải lụa mềm mại làm nổi bật vẻ đẹp dịu dàng, uốn éo duyên dáng.',
    hintForStudent: 'Bạn thử nghĩ xem: Ngoài "dải lụa", dòng sông nhìn từ trên cao còn giống như vật gì? (Chiếc khăn quàng, sợi chỉ bạc, vòng tay mẹ...)'
  },
  {
    id: 'ld2',
    type: 'so_sanh',
    target: 'Mặt nước',
    phrase: 'Mặt hồ phẳng lặng và trong veo tựa như một tấm gương khổng lồ của nàng tiên mây trời.',
    explanation: 'So sánh mặt nước phẳng lặng với chiếc gương soi giúp gợi tả độ phẳng, độ trong vắt tuyệt đối.',
    hintForStudent: 'Khi có nắng rọi xuống, chiếc gương ấy sẽ biến thành gì nhỉ? (Một tấm áo dát vàng, tấm màn nhung thêu kim tuyến...)'
  },
  {
    id: 'ld3',
    type: 'so_sanh',
    target: 'Sóng biển',
    phrase: 'Từng con sóng bạc đầu xô vào bờ như đàn ngựa bạch tung bờm trắng xóa phi nước đại.',
    explanation: 'So sánh con sóng với đàn ngựa bạch mang lại sức sống mãnh liệt, khỏe khoắn cho biển cả.',
    hintForStudent: 'Nếu là sóng nhẹ thì giống như lũ trẻ tinh nghịch đùa vui, còn sóng lớn thì mạnh mẽ như đàn ngựa phi!'
  },
  {
    id: 'ld4',
    type: 'so_sanh',
    target: 'Con suối',
    phrase: 'Nước suối trong vắt như mắt trẻ thơ, có thể nhìn thấy từng chú cá nhỏ đang tung tăng bơi lội.',
    explanation: 'So sánh với mắt trẻ thơ gợi vẻ đẹp ngây thơ, tinh khiết và trong lành.',
    hintForStudent: 'Tiếng suối chảy róc rách bạn thấy giống tiếng đàn tơ hay tiếng hát trong veo của ai?'
  },

  // Nhân hóa
  {
    id: 'ld5',
    type: 'nhan_hoa',
    target: 'Dòng sông',
    phrase: 'Dòng sông như người mẹ hiền từ, ngày đêm chắt chiu dòng sữa ngọt ngào bồi đắp cho ruộng đồng tươi tốt.',
    explanation: 'Gán cho dòng sông tấm lòng người mẹ ân cần chăm sóc con cái (ruộng đồng, xóm làng).',
    hintForStudent: 'Dòng sông có khi nào "tức giận" (mùa lũ cuồn cuộn) hay "trầm tư suy nghĩ" (buổi chiều tà êm ả) không bạn?'
  },
  {
    id: 'ld6',
    type: 'nhan_hoa',
    target: 'Sóng biển',
    phrase: 'Những con sóng tinh nghịch rượt đuổi nhau từ ngoài khơi xa, rồi sà vào lòng bãi cát trắng cười vang giòn giã.',
    explanation: 'Dùng các từ ngữ chỉ hành động của trẻ em (tinh nghịch, rượt đuổi, sà vào lòng, cười vang) để tả sóng.',
    hintForStudent: 'Hãy xem sóng như một người bạn cùng trang lứa đang chơi trò trốn tìm cùng bờ cát!'
  },
  {
    id: 'ld7',
    type: 'nhan_hoa',
    target: 'Cây cối bờ sông',
    phrase: 'Hàng tre già nghiêng mình soi bóng xuống dòng sông, khe khẽ thì thầm câu chuyện ngàn đời.',
    explanation: 'Cây tre biết "nghiêng mình soi gương", biết "thì thầm trò chuyện" như những người bạn tri âm.',
    hintForStudent: 'Cây liễu hay rặng tre ven bờ trông như các thiếu nữ đang làm duyên chải mái tóc dài óng ả đấy.'
  },

  // Liên tưởng độc đáo
  {
    id: 'ld8',
    type: 'lien_tuong',
    target: 'Ánh nắng',
    phrase: 'Từng vệt nắng sớm nhảy múa trên mặt sóng như những nốt nhạc vàng óng của bản giao hưởng bình minh.',
    explanation: 'Liên tưởng giữa ánh sáng nhấp nhô và nốt nhạc vui tươi tạo nên bức tranh đầy thi vị.',
    hintForStudent: 'Bạn hãy tưởng tượng thiên nhiên như một người nhạc sĩ tài hoa đang chơi khúc ca êm dịu.'
  },
  {
    id: 'ld9',
    type: 'lien_tuong',
    target: 'Thuyền bè',
    phrase: 'Mấy chiếc thuyền câu nằm gối đầu lên bãi cát, thong thả ngắm mây trời sau một đêm đánh cá nhọc nhằn.',
    explanation: 'Chiếc thuyền như một người lao động cần mẫn đang thư thái nghỉ ngơi dưới bóng hoàng hôn.',
    hintForStudent: 'Con thuyền bè trên sông có bao giờ như đang ngủ trưa dưới tán dừa mát rượi không?'
  }
];

export const POETRY_HOOKS: PoetryHook[] = [
  {
    id: 'p1',
    author: 'Nhà thơ Tế Hanh',
    quote: 'Quê hương tôi có con sông xanh biếc\nNước gương trong soi tóc những hàng tre\nTâm hồn tôi là một buổi trưa hè\nTỏa nắng xuống dòng sông lấp loáng...',
    scene: 'Dòng sông quê hương',
    guidingIntro: 'Cách vào bài: Mượn lời thơ tha thiết của nhà thơ Tế Hanh để gợi nhắc về con sông gắn bó ruột thịt với tuổi thơ và quê hương em.'
  },
  {
    id: 'p2',
    author: 'Ca dao Việt Nam',
    quote: 'Hồ Gươm soi bóng tháp Rùa\nNước xanh trong vắt bốn mùa rêu phong...',
    scene: 'Hồ Gươm - Thủ đô Hà Nội',
    guidingIntro: 'Cách vào bài: Bắt đầu từ câu ca dao thân thương mà mỗi đứa trẻ Việt Nam đều thuộc nằm lòng để giới thiệu trái tim xanh của thủ đô.'
  },
  {
    id: 'p3',
    author: 'Chủ tịch Hồ Chí Minh',
    quote: 'Tiếng suối trong như tiếng hát xa\nTrăng lồng cổ thụ bóng lồng hoa...',
    scene: 'Con suối núi rừng',
    guidingIntro: 'Cách vào bài: Khơi gợi âm thanh huyền diệu của con suối trong trẻo qua áng thơ trác tuyệt của Bác Hồ ở chiến khu Việt Bắc.'
  },
  {
    id: 'p4',
    author: 'Ca dao dân ca',
    quote: 'Sông Hồng đỏ nặng phù sa\nTháng năm bồi đắp mượt mà nương dâu...',
    scene: 'Sông Hồng / Sông miền Bắc',
    guidingIntro: 'Cách vào bài: Tự hào nhắc đến dòng sông mẹ của nền văn minh lúa nước sông Hồng đỏ màu phù sa cần cù.'
  },
  {
    id: 'p5',
    author: 'Lời bài hát',
    quote: 'Biển quê hương em xanh biếc một màu\nTừng cánh buồm trắng no gió ra khơi...',
    scene: 'Bãi biển quê em',
    guidingIntro: 'Cách vào bài: Dẫn dắt từ giai điệu rộn rã của bài ca về biển cả bao la và nhịp sống sôi động của người dân chài.'
  }
];

export const GDPT_CRITERIA_GUIDE = [
  {
    section: '1. Mở bài (1.0 điểm)',
    score2: 'N/A',
    score1: 'Viết vài câu giới thiệu rõ cảnh định tả: Cảnh gì, ở đâu, ấn tượng ban đầu hoặc dẫn dắt gián tiếp.',
    score05: 'Chỉ có một câu giới thiệu đơn giản, chưa nêu bật nét ấn tượng.',
    score0: 'Không có mở bài hoặc giới thiệu mờ nhạt không rõ nơi định tả.'
  },
  {
    section: '2a. Thân bài - Nội dung (2.0 điểm)',
    score2: 'Chọn được nhiều chi tiết miêu tả là nét đẹp, nét đặc sắc, nét tiêu biểu của cảnh (mặt nước, đôi bờ, sinh vật, sinh hoạt).',
    score1: 'Chọn được một số chi tiết miêu tả nét tiêu biểu.',
    score05: 'Chi tiết chưa rõ nét tiêu biểu, còn thiên về liệt kê, kể lể.',
    score0: 'Không chọn được nét đặc trưng của cảnh.'
  },
  {
    section: '2b. Thân bài - Kĩ năng (2.0 điểm)',
    score2: 'Sắp xếp hợp lí (bao quát -> cụ thể, theo thời gian/mùa); tả bằng 5 giác quan (hình ảnh, màu sắc, âm thanh, mùi vị, xúc giác); có câu văn nêu tình cảm yêu mến, tự hào.',
    score1: 'Chỉ sắp xếp hợp lí một phần; chỉ dùng 1-2 giác quan; chưa lồng được tình cảm tự hào.',
    score05: 'Sắp xếp lộn xộn; chỉ nêu vài dẫn chứng đơn điệu; chưa có cảm xúc.',
    score0: 'Chưa biết tả chi tiết.'
  },
  {
    section: '3. Kết bài (1.0 điểm)',
    score2: 'Viết vài câu nêu được 2 trong 3 ý: tự đánh giá về cảnh, tình cảm gắn bó của người viết, suy nghĩ hoặc mong muốn, việc làm bảo vệ cảnh.',
    score1: 'Chỉ có 1 câu nêu được 1 ý đơn giản.',
    score05: 'N/A',
    score0: 'Không có kết bài hoặc viết lạc đề.'
  },
  {
    section: '4. Chữ viết & Chính tả (1.0 điểm)',
    score2: 'Rõ ràng, sạch đẹp, đúng cỡ chữ, mắc từ 0 - 4 lỗi chính tả.',
    score1: 'Mắc từ 5 - 7 lỗi chính tả.',
    score05: 'Mắc hơn 7 lỗi chính tả.',
    score0: 'Chữ cẩu thả, sai quá nhiều lỗi cơ bản.'
  },
  {
    section: '5. Dùng từ & Đặt câu (1.0 điểm)',
    score2: '0 - 2 lỗi dùng từ/lặp từ, câu văn gãy gọn rõ ý.',
    score1: '3 - 4 lỗi dùng từ, câu sai ngữ pháp hoặc lủng củng.',
    score05: 'Hơn 4 lỗi từ ngữ, hơn 3 lỗi ngữ pháp.',
    score0: 'Diễn đạt tối nghĩa, sai ngữ pháp hàng loạt.'
  },
  {
    section: '6. Sáng tạo (2.0 điểm)',
    score2: 'Đạt 2 trong 3 nét sáng tạo: (1) Lời bày tỏ cảm xúc xen kẽ tự nhiên; (2) Giàu hình ảnh, từ gợi tả âm thanh/màu sắc; (3) Sử dụng so sánh, nhân hóa, liên tưởng độc đáo.',
    score1: 'Đạt 1 trong 3 nét sáng tạo.',
    score05: 'N/A',
    score0: 'Chưa có điểm sáng tạo nào.'
  }
];

export const SAMPLE_ESSAY_PROMPTS = [
  {
    title: 'Dòng sông quê hương buổi chiều hè',
    sceneType: 'Dòng sông',
    text: `Quê hương em có con sông Đáy uốn lượn hiền hòa như dải lụa mềm vắt ngang cánh đồng lúa chín vàng.

Nhìn từ trên đê cao, dòng sông như một dải ngọc biếc lững lờ trôi về phía chân trời. Mặt nước chiều hè phẳng lặng, thi thoảng có vài con sóng lăn tăn xô vào bờ kè khi có chiếc thuyền câu lướt qua. Nước sông mang nặng phù sa đỏ quạch, nuôi dưỡng đôi bờ bãi ngô xanh mướt. Dưới ánh nắng hoàng hôn dát vàng, mặt sông lấp loáng như hàng ngàn viên ngọc bích đang nhảy múa. Ven bờ, hàng tre già nghiêng mình soi bóng xuống mặt nước như đang chải mái tóc dài óng ả. Mùi bùn non ngai ngái hòa cùng hương gió nội mát rượi xua tan đi cái oi bức của buổi trưa hè.

Đẹp nhất là lúc chiều tà, lũ trẻ con chúng em ùa ra bờ sông hóng mát. Tiếng cười đùa rộn rã hòa cùng tiếng mái chèo khua nước róc rách tạo nên khúc ca thanh bình. Đàn vịt bơi lội tung tăng, thi thoảng lại ngụp lặn đớp mồi.

Em yêu con sông quê em tha thiết. Dòng sông như người mẹ hiền từ đã ôm ấp bao kỷ niệm tuổi thơ em. Em tự hứa sẽ luôn cùng các bạn giữ gìn bờ sông sạch đẹp, không xả rác bừa bãi để dòng nước mãi trong xanh.`
  },
  {
    title: 'Hồ Gươm một sớm mùa thu',
    sceneType: 'Hồ nước',
    text: `“Hồ Gươm soi bóng tháp Rùa / Nước xanh trong vắt bốn mùa rêu phong”. Mỗi lần được bố mẹ cho lên Hà Nội chơi, em lại mê mẩn ngắm nhìn vẻ đẹp cổ kính của Hồ Gươm trong buổi sớm mùa thu.

Từ xa nhìn lại, mặt hồ như một chiếc gương soi khổng lồ bằng ngọc bích của mây trời Thăng Long. Làn nước hồ quanh năm xanh biếc một màu xanh huyền thoại, phẳng lặng như tờ. Buổi sớm, một màn sương mỏng manh bàng bạc còn giăng mắc trên những cành lộc vừng rủ hoa đỏ thắm. Nắng thu vàng ươm rọi xuống làm mặt nước bừng sáng lung linh. Tháp Rùa cổ kính nằm trầm mặc giữa lòng hồ như một chứng nhân lịch sử. Cầu Thê Húc đỏ son uốn cong như con tôm dẫn lối vào đền Ngọc Sơn linh thiêng. Gió thu se lạnh mơn man da thịt, mang theo thoang thoảng hương hoa sữa nồng nàn.

Quanh hồ, các ông các bà đang thong thả tập thể dục, trò chuyện râm ran. Tiếng chim hót líu lo trên những tán bàng cổ thụ làm cho không gian thêm rộn rã.

Ngắm nhìn Hồ Gươm, lòng em dâng lên niềm tự hào khôn xiết về thủ đô ngàn năm văn hiến. Em mong sao cảnh sắc nơi đây mãi giữ được nét đẹp yên bình, thanh lịch như một bức tranh thủy mặc trường tồn.`
  }
];
