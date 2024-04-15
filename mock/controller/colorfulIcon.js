const data = [
  'alphabetical_sorting',
  'alphabetical_sorting',
  'alarm_clock',
  'area_chart',
  'approval',
  'answers',
  'approve',
  'assistant',
  'automotive',
  'automatic',
  'bad_decision',
  'bar_chart',
  'bearish',
  'biomass',
  'biohazard',
  'binoculars',
  'bookmark',
  'briefcase',
  'biotech',
  'broken_link',
  'business',
  'bullish',
  'business_contact',
  'businesswoman',
  'cable_release',
  'calculator',
  'businessman',
  'calendar',
  'butting_in',
  'call_transfer',
  'callback',
  'camcorder',
  'camera',
  'camcorder_pro',
  'cancel',
  'camera_addon',
  'camera_identificatio',
  'capacitor',
  'candle_sticks',
  'checkmark',
  'circuit',
  'charge_battery',
  'clear_filters',
  'clapperboard',
  'clock',
  'close_up_mode',
  'collaboration',
  'cell_phone',
  'collapse',
  'collect',
  'cloth',
  'combo_chart',
  'comments',
  'conference_call',
  'compact_camera',
  'contacts',
  'copyleft',
  'copyright',
  'crystal_oscillator',
  'cursor',
  'currency_exchange',
  'customer_support',
  'dam',
  'data_backup',
  'data_configuration',
  'data_encryption',
  'data_protection',
  'data_recovery',
  'database',
  'data_sheet',
  'debt',
  'decision',
  'delete_column',
  'delete_database',
  'department',
  'delete_row',
  'deployment',
  'dislike',
  'disapprove',
  'disclaimer',
  'display',
  'document',
  'do_not_insert',
  'do_not_mix',
  'do_not_inhale',
  'donate',
  'down',
  'doughnut_chart',
  'down_left',
  'down_right',
  'download',
  'edit_image',
  'electrical_sensor',
  'electrical_threshold',
  'electricity',
  'electro_devices',
  'electronics',
  'empty_battery',
  'empty_filter',
  'empty_trash',
  'end_call',
  'engineering',
  'entering_heaven_aliv',
  'expand',
  'export',
  'expired',
  'factory',
  'factory_breakdown',
  'external',
  'faq',
  'feed_in',
  'file',
  'feedback',
  'film',
  'filled_filter',
  'filing_cabinet',
  'film_reel',
  'flash_auto',
  'fine_print',
  'flash_off',
  'flash_on',
  'flow_chart',
  'folder',
  'frame',
  'full_battery',
  'full_trash',
  'gallery',
  'generic_sorting_asc',
  'generic_sorting_desc',
  'genealogy',
  'globe',
  'good_decision',
  'headset',
  'grid',
  'graduation_cap',
  'heat_map',
  'high_priority',
  'high_battery',
  'image_file',
  'home',
  'idea',
  'import',
  'in_transit',
  'integrated_webcam',
  'inspection',
  'invite',
  'internal',
  'ipad',
  'info',
  'iphone',
  'kindle',
  'key',
  'landscape',
  'left',
  'left_down',
  'left_up',
  'leave',
  'like_placeholder',
  'light_at_the_end_of_',
  'library',
  'line_chart',
  'link',
  'like',
  'lock',
  'list',
  'lock_landscape',
  'low_battery',
  'lock_portrait',
  'low_priority',
  'make_decision',
  'medium_priority',
  'manager',
  'menu',
  'middle_battery',
  'minus',
  'missed_call',
  'mind_map',
  'mms',
  'multiple_cameras',
  'money_transfer',
  'music',
  'multiple_devices',
  'multiple_smartphones',
  'multiple_inputs',
  'negative_dynamic',
  'neutral_decision',
  'night_landscape',
  'news',
  'neutral_trading',
  'night_portrait',
  'no_idea',
  'next',
  'no_video',
  'nook',
  'ok',
  'org_unit',
  'opened_folder',
  'old_time_camera',
  'online_support',
  'organization',
  'package',
  'paid',
  'parallel_tasks',
  'overtime',
  'panorama',
  'phone',
  'phone_android',
  'photo_reel',
  'pie_chart',
  'picture',
  'planner',
  'plus',
  'podium_with_audience',
  'podium_without_speak',
  'podium_with_speaker',
  'previous',
  'portrait_mode',
  'positive_dynamic',
  'privacy',
  'process',
  'puzzle',
  'questions',
  'print',
  'radar_plot',
  'rating',
  'ratings',
  'reading',
  'redo',
  'reading_ebook',
  'refresh',
  'registered_trademark',
  'right',
  'reuse',
  'remove_image',
  'right_down',
  'right_up',
  'rotate_to_portrait',
  'rules',
  'rotate_camera',
  'rotate_to_landscape',
  'ruler',
  'scatter_plot',
  'search',
  'safe',
  'self_service_kiosk',
  'selfie',
  'serial_tasks',
  'sales_performance',
  'settings',
  'services',
  'share',
  'shipped',
  'sim_card',
  'shop',
  'service_mark',
  'sim_card_chip',
  'signature',
  'smartphone_tablet',
  'sound_recording_copy',
  'sms',
  'speaker',
  'slr_back_side',
  'start',
  'stack_of_photos',
  'statistics',
  'sports_mode',
  'support',
  'synchronize',
  'switch_camera',
  'survey',
  'tablet_android',
  'template',
  'trademark',
  'todo_list',
  'touchscreen_smartpho',
  'timeline',
  'tree_structure',
  'undo',
  'up_left',
  'two_smartphones',
  'unlock',
  'up',
  'up_right',
  'upload',
  'video_call',
  'video_file',
  'view_details',
  'video_projector',
  'vip',
  'voice_presentation',
  'webcam',
  'voicemail',
  'workflow',
  'about',
  'accept_database',
  'add_image',
  'add_column',
  'add_database',
  'add_row',
]
module.exports = [
  {
    url: '/colorfulIcon/getList',
    type: 'post',
    response(config) {
      const { title, pageNo = 1, pageSize = 72 } = config.body
      let mockList = data.filter((item) => {
        if (title && item.indexOf(title) < 0) return false
        return true
      })
      const pageList = mockList.filter((item, index) => index < pageSize * pageNo && index >= pageSize * (pageNo - 1))
      return {
        code: 200,
        msg: 'success',
        totalCount: mockList.length,
        data: pageList,
      }
    },
  },
]
